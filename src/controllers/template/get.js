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

    controller.get = async ( req, res, next ) =>
    {
        try {
            const IS_PARAM = Object.keys( req.params ).length; //to check if the req comes with url param
            const input = IS_PARAM ? req.params : req.body;    //if not then grab ids from body

            let { status, message, error } = validation.inputVal( input, valModel.id );

            if ( !error ) {
                const result = IS_PARAM ? await dao.getOne( input ) :
                    await dao.get( input );

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