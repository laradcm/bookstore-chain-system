//agregation of delete methods for the controller factory
const deletes = ( table, dao, valModel, validation ) =>
{
    const controller = {};

    controller.del = async ( req, res, next ) =>
    {
        try {
            const IS_PARAM = Object.keys( req.params ).length;  //to check if the req comes with url param
            const input = IS_PARAM ? req.params : req.body;     //if not, then use ids from body

            let { status, message, error } = validation.inputVal( input, valModel.id );

            if ( !error ) {
                const result = IS_PARAM ? await dao.deleteOne( input ) :
                    await dao.delete( input );

                [ status, message ] = validation.resultCheck( table, result, 'deletions');
            }

            res.status( status ).json( message );

        } catch ( err ) {
            err.message = `Error while deleting ${ table }: ` + err.message;
            next( err );
        }
    };

    return controller;
};


module.exports = deletes;