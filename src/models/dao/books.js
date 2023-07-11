const Dao = require( './dao' );
const db = require( '../../db/db' );
const table = 'books';

const booksDao = Dao( table, db );

//extended booksDao for future create custom mod TODO

module.exports = booksDao;

