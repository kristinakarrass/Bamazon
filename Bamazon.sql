CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NULL,
    PRIMARY KEY(item_id)
);

INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("The Secret Life of Pets", "movies/DVDs", 20, 200);
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("Harry Potter and the Prisoner of Azcaban", "books", 15, 35);
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("Hansgrohe faucet", "home improvement", 120, 5);
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("Neutrogena moisturizer", "beauty", 8, 25);
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("Thomas the Train starter set", "toys", 45, 21);
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("shovel", "outdoor/patio", 30, 9);
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("queen size mattress", "furniture", 500, 5);
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("Kichen Aid Stand Mixer", "kitchen", 300, 13);
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("Coleman 8-person tent", "camping", 40, 45);
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("Weber grill", "outdoor/patio", 500, 2);
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("Hidden Figures", "Movies/DVDs", 30, 150); 
INSERT products (product_name, department_name, price, stock_quantity)
	VALUES ("The Whole 30", "books", 40, 12);