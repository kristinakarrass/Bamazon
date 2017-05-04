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
            // forSale();
        } else if (answer.action === "low inventory") {
        	console.log("low inventory");
            // lowInventory();
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

}

function lowInventory() {

}

function addInventory() {

}

function newProduct() {

}
