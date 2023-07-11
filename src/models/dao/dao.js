
const { Knex } = require( 'knex' );
const knex = require( 'knex' );
const knexFile = require( '../../db/knexfile' );
const db = knex( knexFile.test );

const Dao = ( table, db ) =>
{
    const dao = {};

    //------------gets------------------------------------------
    dao.getAll = async () =>
    {
        return await db( table ).select( '*' );
    };

    dao.getUnique = async ( id ) =>
    {
        return await db( table ).where( 'id', id );
    };

    // dao.checkIfUnique = async ( id ) => //TODO
    // {
    //     return await db( table ).where( 'id', id );
    // };

    //---------------creates------------------------------------
    dao.create = async ( body ) =>
    {
        try {
            const finalResult = await db.transaction( async trx =>
            {
                const result = await trx( table ) //create stores
                    .insert( body );

                // const updateInventory = await trx( table ) //write update inventory here
                //     .insert( body );//TODO

                if ( trx.isCompleted ) {
                    return result;
                }

            } );

            return finalResult.rowCount;

        } catch ( error ) {
            throw ( error );
        }
    };

    //---------------updates------------------------------------
    dao.updateUnique = async ( id, body ) =>
    {
        const result = await db( table )
            .where( 'id', id )
            .update( body );

        return result;
    };

    //--------------deletes-------------------------------------
    dao.deleteUnique = async ( id ) =>
    {
        return await db( table ).where( 'id', id ).del();
    };

    return dao;
};

module.exports = Dao;