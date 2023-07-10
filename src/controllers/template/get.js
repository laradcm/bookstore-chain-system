//agregation of get methods for the controller factory
const get = ( table, dao, valModel ) =>
{
    const controller = {};

    controller.getAll = async ( req, res, next ) =>
    {
        try {
            res.json( await dao.getAll() );

        } catch ( err ) {
            err.message = `Error while getting ${table}: ` + err.message;
            next( err );
        }
    };

    controller.getUnique = async ( req, res, next ) =>
    {
        try {
            let message = '';
            let status = 200;

            const { error } = valModel.id.validate( { id: req.params.id });

            if ( error ) {
                message = `Bad input: ${ error.message }`;
                status = 400;

            } else {
                const result = await dao.getUnique( req.params.id );
                message = result;
            }

            res.status( status ).json( message );

        } catch ( err ) {
            err.message = `Error while getting ${table} by id: ` + err.message;
            next( err );
        }
    };

    return controller;
};

module.exports = get;