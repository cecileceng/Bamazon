# Bamazon
Created an Amazon-like storefront using MySQL, the MySQL NPM Package, and the Prompt Package. 

The application will take in orders from customers and deplete from the store's total supplies.

- Initializing node bamazon.js in the command line brings up the storefront.
- It will ask you what you'd like to purchase by item number and how many:
![Screenshot](/bamazon-screen.png)

If there are enough then it will adjust the quantities and continue:
![Screenshot](/bamazon-screen-2.png)

If there are not enough, an error message will occur:
![Screenshot](/bamazon-screen-3.png)

Also features an npm package to make pretty unicode tables:
http://www.npmjs.com/package/cli-table