const Dao = require( './dao' );
const inventoryDao = require( './inventory' );
const db = require( '../../db/db' );
const table = 'stores';

const storesDao = Dao( table, db );

//custom dao functions:

storesDao.create = async ( body ) =>
{
    try {
        const finalResult = await db.transaction( async trx =>//when a new store is inserted, add it to inventory for all books
        {
            const storesIds = await trx( table )
                .insert( body, 'id' );

            const booksIds = await trx( 'books' ).select( 'id' );//gets books

            const inventoryIds = await inventoryDao.create( trx, storesIds, booksIds );

            if ( trx.isCompleted ) {
                return {
                    result: storesIds,
                    effects: inventoryIds
                };
            }
        } );

        return finalResult;

    } catch ( error ) {
        throw ( error );
    }
};

module.exports = storesDao;

