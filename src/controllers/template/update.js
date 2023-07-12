const getIdFromBody = require( "../../helpers/getIdFromBody" );

//agregation of update methods for the controller factory
const update = ( table, dao, valModel, validation ) =>
{
    const controller = {};

    controller.update = async ( req, res, next ) =>
    {
        try {
            let id = req.params;
            let data = req.body;
            let isMany = false;

            if ( !Object.keys(id).length) {//if there is no id as a request parameter
                isMany = true;
                [ id, data ] = getIdFromBody( req.body, valModel.id );//compare body against schema to retrieve id and body
            }

            const valResultId = validation.inputVal( id, valModel.id );
            const valResultBody = validation.inputVal( data, valModel.update );

            let { status, message, error } = valResultId.error ? valResultId : valResultBody;

            if ( !error ) {
                const result = !isMany ? await dao.updateUnique( id, data )
                    : await dao.updateMany( id, data );

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