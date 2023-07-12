//agregation of create methods for the controller factory
const create = ( table, dao, valModel, validation ) =>
{
    const controller = {};

    controller.create = async ( req, res, next ) =>
    {
        try {
            let { status, message, error } = validation.inputVal( req.body, valModel.create );

            if ( !error ) {
                const result = await dao.create( req.body );
                message = `${ result.result.length } ${ table } insertions successful!`;
            }

            res.status( status ).json( message );

        } catch ( err ) {
            err.message = `Error while creating ${ table }: ` + err.message;
            next( err );
        }
    };

    return controller;
};


module.exports = create;