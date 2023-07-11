const inventoryStatusCheck = require( '../../helpers/inventoryStatusCheck' );
//agregation of update methods for the controller factory
const update = ( table, dao, valModel ) =>
{
    const controller = {};

    controller.updateUnique = async ( req, res, next ) =>
    {
        try {
            let message = '';
            let status = 200;

            const errorId = valModel.id.validate( req.params ).error;
            const errorBody = valModel.update.validate( req.body ).error;

            if ( errorId ) {
                message = `Bad input: ${ errorId.message }`;
                status = 400;

            } else if ( errorBody ) {
                message = `Bad input: ${ errorBody.message }`;
                status = errorBody.message.includes( 'not allowed' ) ? 403 : 400;

            } else {
                req.body = inventoryStatusCheck( table, req.body );
                const result = await dao.updateUnique( req.params, req.body );
                if ( result === 0 ) {
                    message = `${ table } not found, no updates occured`;
                    status = 404;

                } else {
                    message = `${ result } ${ table } updates successful!`;
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