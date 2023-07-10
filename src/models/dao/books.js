const knex = require( 'knex' );
const db = require( '../../db/db' );
const table = 'books';

const getAll = async () =>
{
    return await db( table ).select( '*' );
};

const getUnique = async ( id ) =>
{
    return await db( table ).where( 'id', id );
};

const create = async ( body ) =>
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

const updateUnique = async ( id, body ) =>
{
    const result = await db( table )
        .where( 'id', id )
        .update( body );

    return result;
};

const deleteUnique = async ( id ) =>
{
    return await db( table ).where( 'id', id ).del();
};

module.exports = {
    getAll,
    getUnique,
    create,
    updateUnique,
    deleteUnique
};

