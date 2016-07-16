var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'passw0rd',
	database: 'bamazon'
})

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected as id' + connection.threadId);
	startBuying();
})

function printStuff(res) {
	var table = new Table({
		head: ['Item ID', 'Product Name', 'Department', 'Cost', 'Stock']
		, colWidths: [10, 45, 40, 8, 8]
	});
	for (var i = 0; i < res.length; i++) {
		table.push([res[i].itemID, res[i].product_name, res[i].department_name, res[i].item_cost, res[i].stock_quantity]);
	}
	console.log(table.toString());
}

var startBuying = function() {
	connection.query('SELECT * FROM products', function(err, res) {
		printStuff(res);
		inquirer.prompt({
			name: 'choice',
			type: 'rawlist',
			choices: function(value) {
				var choiceArray = [];
				for (var i = 0; i < res.length; i++) {
					choiceArray.push(res[i].item_name);
				}
				return choiceArray;
			},
			message: 'Which item would you like to purchase?'
		}).then(function(answer) {
			for (var i = 0; i < res.length; i++) {
				if (res[i].item_name == answer.choice) {
					var chosenItem = res[i];
					inquirer.prompt({
						name: 'bid',
						type: 'input',
						message: 'How many would you like to purchase?'
					}).then(function(answer) {
						if (chosenItem.highestbid < parseInt(answer.bid)) {
							connection.query('UPDATE products SET ? WHERE ?', [{ // TODO: Subtract from existing quantity
								user_purchase: answer.purchase
							}, {
								id: chosenItem.id
							}], function(err, res) {
								console.log('Your purchase was successful!');
								startBuying();
							}); 
						} else {
							console.log('There are not enough in stock for you to purchase that many.');
						}
					})
				}
			}
		})
	})
}