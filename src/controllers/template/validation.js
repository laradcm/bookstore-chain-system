const isDatatype = require( '../../helpers/isDatatype' );

//validation tasks for the controllers requests


//checks before operation
const inputVal = ( input, schema ) =>
{
    let message = '';
    let status = 200;
    let error = false;


    if ( isDatatype( input, 'Array' ) ) { //handles users single or multiple inserts

        for ( item of input ) {

            error = schema.validate( item ).error;
            if ( error ) { break; }
        }

    } else {
        error = schema.validate( input ).error;
    }


    if ( error ) {
        message = `Bad input: ${ error.message }`;
        status = error.message.includes( 'not allowed' ) ? 403 : 400;
    }

    return { status, message, error };
};


//checks for after the operation
const resultCheck = ( table, result, operation = false ) => 
{
    let message = result;
    let status = 200;

    if ( result.length < 1 || result === 0 ) {
        message = `${ table } not found`;
        message += operation ? `, no ${ operation } occurred.` : '';
        status = 404;

    } else if ( operation ) {
        message = `${ result } ${ table } ${ operation } successful!`;
    }

    return [ status, message ];
};



module.exports = {
    resultCheck,
    inputVal
};