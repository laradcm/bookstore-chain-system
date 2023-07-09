//book validation schema
const Joi = require( 'joi' );

const bookSchema = Joi.object( {

    id:
        [
            Joi.string().pattern( /^[1-9][0-9]*$/, 'numbers min 1' ).required()
            , Joi.number().min( 1 ).required()
        ],

    title: Joi.string().max( 255 ).required(),

    author: Joi.string().max( 255 ).required(),

    desc: Joi.string().max( 255 ).required()

} );

module.exports = bookSchema;

// ex of implementation: Joi.assert(book, schema);//validation, will throw if it fails