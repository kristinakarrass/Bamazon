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

function storeInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("==============================================================");
        //print all available products in the store
        for (var i = 0; i < res.length; i++) {
            console.log("Product Id: " + res[i].item_id + "\nName: " + res[i].product_name + "\nPrice: " + res[i].price);
            console.log("==============================================================");
        }
    });
}

storeInventory();