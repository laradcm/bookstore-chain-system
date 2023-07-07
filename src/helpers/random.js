//zero based when lower is omitted, 0-100 if both arguments are omitted

const random = ( lower = 100, upper ) =>
{

    if ( !upper ) {
        upper = lower;
        lower = 0;
    }

    return Math.floor( Math.random() * ( upper + 1 - lower ) ) + lower;
};

module.exports = random;

