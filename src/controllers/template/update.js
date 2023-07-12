const getIdFromBody = require( "../../helpers/getIdFromBody" );

//agregation of update methods for the controller factory
const update = ( table, dao, valModel, validation ) =>
{
    const controller = {};

    controller.update = async ( req, res, next ) =>
    {
        try {
            let id = req.params;//init variables in case it is PARAMs
            let data = req.body;

            const IS_PARAM = Object.keys(id).length;

            if ( !IS_PARAM) {//if there is no request parameter
                [ id, data ] = getIdFromBody( req.body, valModel.id );//compare body against schema to retrieve id and body separately
            }

            const valResultId = validation.inputVal( id, valModel.id );
            const valResultBody = validation.inputVal( data, valModel.update );

            let { status, message, error } = valResultId.error ? valResultId : valResultBody;//if ID didnt fail, load body results

            if ( !error ) {
                const result = IS_PARAM ? await dao.updateOne( id, data )
                    : await dao.update( id, data );

                [ status, message ] = validation.resultCheck( table, result, 'updates' );
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