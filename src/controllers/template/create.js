
const isDatatype = require( '../../helpers/isDatatype' );

//agregation of create methods for the controller factory
const create = ( table, dao, valModel ) =>
{
    const controller = {};

    controller.create = async ( req, res, next ) =>
    {
        try {
            let message = '';
            let status = 200;
            let error = {};

            if ( isDatatype( req.body, 'Array' ) ) { //handles users single or multiple inserts
                for ( item of req.body ) {

                    error = valModel.create.validate( item ).error;
                    if ( error ) { break; }
                }
            } else {
                error = valModel.create.validate( req.body ).error;
            }

            if ( error ) {
                message = `Bad input: ${ error.message }`;
                status = 400;

            } else {
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