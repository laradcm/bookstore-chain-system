//agregation of update methods for the controller factory
const update = ( table, dao, valModel ) =>
{
    const controller = {};

    controller.updateUnique = async ( req, res, next ) =>
    {
        try {
            let message = '';
            let status = 200;

            const errorId = valModel.id.validate( { id: req.params.id } ).error;
            const errorBody = valModel.update.validate( req.body ).error;

            if ( errorId ) {
                message = `Bad input: ${ errorId.message }`;
                status = 400;

            } else if ( errorBody ) {
                message = `Bad input: ${ errorBody.message }`;
                status = 400;

            } else {
                const result = await dao.updateUnique( req.params.id, req.body );
                if ( result === 0 ) {
                    message = `${ table } not found, no deletions occured`;
                    status = 404;

                } else {
                    message = `${ result } ${ table } deletion succesful!`;
                }
            }

            res.status( status ).json( message );

        } catch ( err ) {
            err.message = `Error while updating ${ table }: ` + err.message;
            next( err );
        }
    };

    return controller;

};

module.exports = update;