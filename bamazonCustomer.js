var mysql = require("mysql");
var prompt = require("prompt");
var stock = 0;
var newStock = 0;
var amount = 0;
var prodId = 0;
var price = 0;
var item = "";

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MySQL2016",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connection as id " + connection.threadId);
});

function start() {
    //get information from database
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("==============================================================");
        //print all available products in the store
        for (var i = 0; i < res.length; i++) {
            console.log("Product Id: " + res[i].item_id + "\nName: " + res[i].product_name + "\nPrice: " + res[i].price);
            console.log("==============================================================");
        }
        //prompt user for input
        prompt.start();

        prompt.get([{
            message: "Please enter the id of the product you want to purchase: ",
            name: "product_id",
            required: true
        }, {
            message: "Please enter how many units you would like to purchase: ",
            name: "amount",
            required: true
        }], function(err, result) {
        	//store input in variables for comparison
            prodId = result.product_id;
            amount = result.amount;
            console.log("Product Id: " + prodId);
            console.log("Amount: " + amount);
            //check if user can purchase number of items he has selected
            connection.query("SELECT * FROM products WHERE item_id=" + prodId, function(err, res) {
                item = res[0].product_name;
                price = res[0].price;
                stock = parseInt(res[0].stock_quantity);
                //compare user's request to stock availability
                if (stock >= amount) {
                    newStock = stock - amount;
                    price = price * amount;
                    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newStock }, { item_id: prodId }], function(err, res) {
                        console.log("You were charged $" + price + " for " + amount + " " + item + ".");
                        //check if user wants to purchase another product
                        startOver();
                    })
                } else {
                    console.log("Sorry, we do not have sufficient stock in our inventory.");
                    //check if user wants to purchase another product
                    startOver();
                }
            })
        });
    });
}

function startOver() {

    prompt.start();
    //ask user if he wants to keep purchasing products
    prompt.get([{
        message: "Would you like to purchase another product? y/n ",
        name: "answer",
        required: true
    }], function(err, result) {
        // if answer is yes, run start function
        if (result.answer === "y") {
            start();
        } else {
            console.log("Have a great day and see you again soon!");
            return;
        }
    })
}
start();
