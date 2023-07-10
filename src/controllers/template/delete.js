//agregation of delete methods for the controller factory

const deletes = ( table, dao, valModel ) =>
{
    const controller = {};

    controller.deleteUnique = async ( req, res, next ) =>
    {
        try {
            let message = '';
            let status = 200;

            const { error } = valModel.id.validate( { id: req.params.id } );
            if ( error ) {
                message = `Bad input: ${ error.message }`;
                status = 400;

            } else {
                const result = await dao.deleteUnique( req.params.id );
                if ( result === 0 ) {
                    message = `${ table } not found, no deletions occured`;
                    status = 404;

                } else {
                    message = `${ result } ${ table } deletion succesful!`;
                }
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