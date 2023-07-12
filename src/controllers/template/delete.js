//agregation of delete methods for the controller factory
const deletes = ( table, dao, valModel, validation ) =>
{
    const controller = {};

    controller.deleteUnique = async ( req, res, next ) =>
    {
        try {
            const input = req.params ? req.params : req.body;
            let { status, message, error } = validation.inputVal( input, valModel.id );

            if ( !error ) {
                const result = await dao.deleteUnique( req.params );
                [ status, message ] = validation.resultCheck( table, result, 'deletions' );
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