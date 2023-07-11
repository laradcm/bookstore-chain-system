//zero based when lower is omitted, 0-100 if both arguments are omitted

const random = ( lower = 100, upper ) =>
{
    if ( !upper ) {
        upper = lower;
        lower = 0;
    }

    if ( isNaN( lower ) || isNaN( upper ) ) {
        throw ( "invalid input, entry should be a number or a string representation of a number" );
    }

    if ( lower < 0 || upper < 0 ) {
        throw ( "invalid input, numbers should be positive" );
    }

    if ( upper < lower ) {
        throw ( "invalid input, upper range should be higher than lower range number" );
    }

    return Math.floor( Math.random() * ( upper + 1 - lower ) ) + lower;

};

module.exports = random;

