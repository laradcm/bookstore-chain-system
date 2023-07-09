
/**
 * @type { Knex }
 */
const { Knex } = require( 'knex' );
const db = require( '../../db/db' );
const table = 'books';


const getBooks = async () =>
{
    const result = await db( table ).select( '*' );
    return result;
};

const getBookById = async ( id ) =>
{
    const result = await db( table ).where( 'id', id );
    return result;
};


module.exports = {
    getBooks,
    getBookById,
};

