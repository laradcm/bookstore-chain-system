# Bookstores Inventory System

Inventory system for multiple bookstores containing the same copies of the same book, and notify when one or a set of books are out of stock in a specific bookstore.

--------------------------------------------------------------------------------------
### Requirements:

- API endpoints to get, create, update stock levels, delete book(s) from the bookstore database (CRUD operations)
- A book can have both status "in_stock" and "out_of_stock". Create a method that will be called every minute to detect whether any of the books will have a quantity of "0", if this is the case, it will update the status of the book to be out_of_stock.
- Ensure that when we update the quantity of a book, it will bring the status back to "in_stock" if the quantity is more than 0.

--------------------------------------------------------------------------------------
### Technologies Used:

- Express.js
- knex.js
- postgreSQL


### ER Diagram:

<img src="public/img/ER_Diagram.PNG" 
alt="Relational database diagram"
/>

