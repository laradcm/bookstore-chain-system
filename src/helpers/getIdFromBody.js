const Joi = require( 'joi' );

//speparate id objects from the body request

const getIdFromBody = ( body, schemaId ) =>
{
    const idKeys = Object.keys( schemaId.describe().keys ); //gets object keys from Joi id schema
    const id = [];
    const data = [];

    for ( let i = 0; i < body.length; i++ ) {

        id.push( {} );
        data.push( {} );

        for ( const key in body[ i ] ) {

            if ( idKeys.includes( key ) ) {

                id[ i ][ key ] = body[ i ][ key ];

            } else {

                data[ i ][ key ] = body[ i ][ key ];
            }
        }
    }
    return [ id, data ];
};


module.exports = getIdFromBody;
