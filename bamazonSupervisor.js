var mysql = require("mysql");
var prompt = require("prompt");
var colors = require("colors");
var Table = require("cli-table2");

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