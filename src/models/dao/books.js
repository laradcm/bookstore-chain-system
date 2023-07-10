const Dao = require( './dao' );
const db = require( '../../db/db' );
const table = 'books';

const booksDao = Dao( table, db );

//extended booksDao for future custom mod TODO
booksDao.create = async ( body ) =>
{
    try {
        return await db.transaction( async trx =>
        {
            const result = await trx( table ) //create books
                .insert( body );

            // const updateInventory = await trx( table ) //write update inventory here
            //     .insert( body );//TODO

            if ( trx.isCompleted ) {
                return result;
            }

        } );

    } catch ( error ) {
        console.error( error );
    }
};

module.exports = booksDao;

