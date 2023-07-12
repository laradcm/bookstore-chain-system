
const { Knex } = require( 'knex' );//attempt to bring types in, I miss TypeScript
const knex = require( 'knex' );
const knexFile = require( '../../db/knexfile' );
const db = knex( knexFile.test );

//factory function to build CRUD of Data Access Operations

const Dao = ( table, db ) =>
{
    const dao = {};
    dao.connection = db;//so you can forcibly destroy it if needed

    //------------gets------------------------------------------
    dao.getAll = async () =>
    {
        return await db( table ).select( '*' );
    };


    dao.getUnique = async ( id ) =>
    {
        return await db( table ).where( id );
    };


    //---------------creates------------------------------------
    dao.create = async ( body ) =>
    {
        try {
            const finalResult = await db.transaction( async trx =>
            {
                const result = await trx( table )
                    .insert( body );

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
    dao.updateUnique = async ( id, body, trx = false ) =>
    {
        dbSelect = trx ? trx : db;
        const result = await dbSelect( table )
            .where( id )
            .update( body );

        return result;
    };

    dao.updateMany = async ( id, body ) => //depends on updateUnique
    {
        try {
            const finalResult = await db.transaction( async trx =>
            {
                const result = [];

                for ( let i = 0; i < id.length; i++ ) {

                    const res = await dao.updateUnique( id[ i ], body[ i ], trx ); //here
                    result.push( res );
                }

                if ( trx.isCompleted ) {
                    return result;
                }
            } );

            return finalResult.length;

        } catch ( error ) {
            throw ( error );
        }
    };

    //--------------deletes-------------------------------------
    dao.deleteUnique = async ( id ) =>
    {
        return await db( table ).where( id ).del();
    };

    dao.deleteMany = async ( id ) =>
    {
        ids = id.map( ( entry ) => entry.id );
        return await db( table ).whereIn( 'id', ids ).del();
    };

    return dao;
};

module.exports = Dao;