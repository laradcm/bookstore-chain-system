
/**
 * @type { Knex }
 */
const { Knex } = require( 'knex' );
const db = require( '../../db/db' );


const getBooks = async () =>
{
    const books = await db.select( '*' ).table( 'books' );
    return books;
};


