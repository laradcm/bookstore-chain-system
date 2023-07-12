const Dao = require( './dao' );
const inventoryDao = require( './inventory' );
const db = require( '../../db/db' );
const table = 'books';

const booksDao = Dao( table, db ); 

//custom dao functions:

booksDao.create = async ( body ) =>//when a new book is inserted, add it to inventory in all stores
{
    try {
        const finalResult = await db.transaction( async trx =>
        {
            const booksIds = await trx( table )
                .insert( body, 'id' );

            const storesIds = await trx( 'stores' )//gets stores
                .select( 'id' );

            const inventoryIds = await inventoryDao.create( trx, storesIds, booksIds );

            if ( trx.isCompleted ) {
                return {
                    result: booksIds,
                    effects: inventoryIds 
                };
            }
        } );

        return finalResult;

    } catch ( error ) {
        throw ( error );
    }
};



module.exports = booksDao;

