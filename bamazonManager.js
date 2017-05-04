var mysql = require("mysql");
var prompt = require("prompt");
var inquirer = require("inquirer");

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
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "Would you like to view products for sale, view low inventory, add to inventory or add a new product?",
        choices: ["for sale", "low inventory", "add inventory", "add product"]
    }]).then(function(answer) {
        if (answer.action === "for sale") {
            console.log("for sale");
            forSale();
        } else if (answer.action === "low inventory") {
            console.log("low inventory");
            lowInventory();
        } else if (answer.action === "add inventory") {
            console.log("add inventory");
            // addInventory();
        } else {
            console.log("add product");
            // newProduct();
        }
    });
}

start();

function forSale() {
    connection.query("SELECT * FROM products WHERE stock_quantity != 0", function(err, res) {
        console.log("======================================================================");
        console.log("            Items currently in stock");
        console.log("======================================================================");
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nPrice: " + res[i].price + "\nQuantity: " + res[i].stock_quantity);
            console.log("======================================================================");
        }
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        console.log("======================================================================");
        console.log("            Items currently low in stock (<5)");
        console.log("======================================================================");
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nPrice: " + res[i].price + "\nQuantity: " + res[i].stock_quantity);
            console.log("======================================================================");
        }
    });
}

function addInventory() {

}

function newProduct() {

}
