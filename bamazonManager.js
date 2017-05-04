var mysql = require("mysql");
var prompt = require("prompt");

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