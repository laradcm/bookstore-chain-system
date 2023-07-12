//agregation of get methods for the controller factory
const get = ( table, dao, valModel, validation ) =>
{
    const controller = {};

    controller.getAll = async ( req, res, next ) =>
    {
        try {
            res.json( await dao.getAll() );

        } catch ( err ) {
            err.message = `Error while getting ${ table }: ` + err.message;
            next( err );
        }
    };

    controller.getUnique = async ( req, res, next ) =>
    {
        try {
            let { status, message, error } = validation.inputVal(  req.params, valModel.id  );

            if ( !error ) {
                const result = await dao.getUnique( req.params );
                [ status, message ] = validation.resultCheck( table, result );
            }

            res.status( status ).json( message );

        } catch ( err ) {
            err.message = `Error while getting ${ table } by id: ` + err.message;
            next( err );
        }
    };

    return controller;
};

module.exports = get;