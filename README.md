# Bamazon

Bamazon is your CLI storefront, which allows customers to make purchases, managers to check/update inventory and executives to see how well departments are doing.

## Bamazon Customer

This part of the app allows customers to see which products are on offer in our store. They can then decide, what quantity of which product they would like to purchase. The customer will receive a message with the amount he was charged and the product he bought. He will then be prompted if he would like to make another purchase.

![First Customer Screenshot](/screenshots/customerscreenshot1.png?raw=true "customer successfully purchased products")


Should there be insufficient stock of a product, the customer will be alerted, that the product has sold out. He will be prompted if he would like to make another purchase.

![Second Customer Screenshot](/screenshots/customerscreenshot2.png?raw=true "purchase failed")

## Bamazon Manager

This part of the app lets the store manager check all products for sale, products with low stock, she can add to stock of existing products on inventory, or add new products to the store inventory. The inventory list displays the unique product ID, product name, the department the product is stocked in, its price and how many items are in stock.

### View items for sale

The manager will be prompted to enter a number in order to choose from a list. She will then see all items the store offers, with low stocks displayed in red, sufficient stock in green.

![First Manager Screenshot](/screenshots/managerscreenshot1.png?raw=true "products for sale")

### View items with low stock

She will then be able to choose from the same menu to see only items with low stock.

![Second Manager Screenshot](/screenshots/managerscreenshot2.png?raw=true "low stock inventory")

### Add to existing inventory

She can then choose to add to existing inventory.

![Third Manager Screenshot](/screenshots/managerscreenshot3.png?raw=true "add to inventory")

As you can see, the stock of the book The Whole 30 went out of the red numbers, which indicate low stock.

### Add new product to inventory

She can also add new items to the inventory.

![Fourth Manager Screenshot](/screenshots/managerscreenshot4.png?raw=true "add new item to inventory")

The new item was added at the bottom of the list.

## Bamazon Supervisor

The supervisor can view products sales by department and create new departments.

### View Product Sales by Department

![First Supervisor Screenshot](/screenshots/supervisor1.png?raw=true "view product sales by department")

The column for total profits is calculated and added by the code and does not exists in the database.

![MySQL database screenshot](/screenshots/supervisor3.png?raw=true "database screenshot")

### Add a new department

![Second Supervisor Screenshot](/screenshots/supervisor2.png?raw=true "add a new department")

### Technologies used
		
* node.js
* MySQL
* npm packages
	* prompt
	* mysql
	* cli-table2
	* colors
