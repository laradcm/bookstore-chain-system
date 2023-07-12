
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


    dao.getOne = async ( id ) =>
    {
        return await db( table ).where( id );
    };

                             
    dao.get = async ( id ) =>// input is [ {id1:1, id2:2}, {id1:3, id2:2}...]
    {   
        keys = Object.keys( id[ 0 ] );

        ids = id.map( ( entry ) => 
            keys.map( ( key ) => entry[ key ] )
        );

        //result whereIn( [ id1, id2 ] , [ [1,2], [3,2], [2,3]...] )
        return await db( table ).whereIn( keys, ids );
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
    dao.updateOne = async ( id, body, trx = false ) =>
    {
        dbSelect = trx ? trx : db;
        const result = await dbSelect( table )
            .where( id )
            .update( body );

        return result;
    };

    dao.update = async ( id, body ) => //depends on updateOne
    {
        try {
            const finalResult = await db.transaction( async trx =>
            {
                const result = [];

                for ( let i = 0; i < id.length; i++ ) {

                    const res = await dao.updateOne( id[ i ], body[ i ], trx ); //here
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
    dao.deleteOne = async ( id ) =>
    {
        return await db( table ).where( id ).del();
    };

    dao.delete = async ( id ) =>// input is [ {id:1}, {id:3} ...]
    {
        ids = id.map( ( entry ) => entry.id );//[ 1, 3, ...]
        return await db( table ).whereIn( 'id', ids ).del();
    };

    return dao;
};

module.exports = Dao;