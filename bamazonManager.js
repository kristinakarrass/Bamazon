var mysql = require("mysql");
var prompt = require("prompt");
var inquirer = require("inquirer");
var Table = require("cli-table2");
//create layout for cli table
var table = new Table({
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

var productID = 0;
var amount = 0;
var product = "";
var price = 0;
var department = "";

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MySQL2016",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    //ask manager what he wants to do
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "Would you like to view products for sale, view low inventory, add to inventory or add a new product?",
        choices: ["for sale", "low inventory", "add to inventory", "add product"]
    }]).then(function(answer) {
        //logs all items that are available (stock greater than 0)
        if (answer.action === "for sale") {
            console.log("for sale");
            forSale();
            //logs all items with low inventory (smaller than 5)
        } else if (answer.action === "low inventory") {
            console.log("low inventory");
            lowInventory();
            //lets manager add inventory to any item in store
        } else if (answer.action === "add to inventory") {
            console.log("add to inventory");
            addInventory();
            //lets manager add products to store inventory
        } else {
            console.log("add product");
            addProduct();
        }
    });
}

function forSale() {
    connection.query("SELECT * FROM products WHERE stock_quantity != 0", function(err, res) {
    		table.push(["Item ID", "Product Name", "Price", "Stock Quantity"]);
        for (var i = 0; i < res.length; i++) {
            table.push([ res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
        }
        console.log("------------------------  ITEMS CURRENTLY IN STOCK  ---------------------------");
        console.log(table.toString());
        start();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        console.log("            Items currently low in stock (<5)");
        table.push(["Item ID", "Product Name", "Price", "Stock Quantity"]);
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        start();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("==============================================================");
        //print all available products in the store
        for (var i = 0; i < res.length; i++) {
            console.log("Product Id: " + res[i].item_id + "\nName: " + res[i].product_name + "\nPrice: " + res[i].price);
            console.log("==============================================================");
        }
        //ask which items manager wants to add to
    prompt.start();

    prompt.get([{
        message: "Please enter the id of the product you'd like to add.",
        name: "productID",
        required: true
    }, {
        message: "How many would you like to add to your inventory?",
        name: "amountAdded",
        required: true
    }], function(err, res) {
            productID = res.productID;
            amount = parseInt(res.amountAdded);
            //get current stock of product and add new amount to it
            connection.query("Select stock_quantity FROM products WHERE ?", { item_id: productID }, function(err, res) {
                if (err) throw err;
                var oldStock = parseInt(res[0].stock_quantity);
                amount += oldStock;
                //update new amount in database
                connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: amount }, { item_id: productID }], function(err, res) {
                    if (err) throw err;
                    console.log("You have successfully added items to your inventory!");
                    start();
                });
            });

        });
    });
}

function addProduct() {
    //prompt user for input
    prompt.start();

    prompt.get([{
        message: "Which product would you like to add to your inventory?",
        name: "product",
        required: true
    }, {
        message: "What department will the product be added to?",
        name: "department",
        required: true
    }, {
        message: "How many would you like to add?",
        name: "amount",
        required: true
    }, {
        message: "What is the price of your new product?",
        name: "price",
        required: true
    }], function(err, result) {
        //store input in variables for comparison
        product = result.product;
        department = result.department;
        amount = result.amount;
        price = result.price;
        console.log("Product: " + product);
        console.log("department: " + department + "\nAmount: " + amount + "\nPrice: " + price);
        //insert new product into 
        connection.query("INSERT INTO products SET ?", {
                product_name: product,
                department_name: department,
                price: price,
                stock_quantity: amount
            },
            function(err, res) {
                if (err) throw err;
                console.log("You have successfully added a new product to your inventory.");
            });
    });
}
