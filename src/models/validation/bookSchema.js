//book validation schema
const Joi = require( 'joi' );

const createBookSchema = Joi.object( {

    title: Joi.string().max( 255 ).required(),

    author: Joi.string().max( 255 ).required(),

    desc: Joi.string().max( 255 ).required()

} );


const bookKeys = Object.keys( createBookSchema.describe().keys );
const updateBookSchema = createBookSchema.fork( bookKeys, schema => schema.optional() );


module.exports = {
    create: createBookSchema, 
    update: updateBookSchema,
};
