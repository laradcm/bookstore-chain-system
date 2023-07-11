const Controller = require( './template/controller' );
const valModel = require( '../models/validation' );
const dao = require( '../models/dao/books' );


const booksController = Controller( 'books', dao, valModel.bookSchema );

//put your custom controller functions here:
//ex booksController.myCustomGet =  async (req, res, next) => {...}


module.exports = booksController;