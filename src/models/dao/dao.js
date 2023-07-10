
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

    //---------------creates------------------------------------
    dao.create = async ( body ) =>
    {
        try {
            return await db.transaction( async trx =>
            {
                const result = await trx( table ) //create books
                    .insert( body );

                if ( trx.isCompleted ) {
                    return result;
                }
            } );

        } catch ( error ) {
            console.error( error );
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