//book validation schema
const Joi = require( 'joi' );

const createBookSchema = Joi.object( {

    title: Joi.string().max( 255 ).required(),

    author: Joi.string().max( 255 ).required(),

    desc: Joi.string().max( 255 ).required()

} );

//for update make keys optional
const bookKeys = Object.keys( createBookSchema.describe().keys );
const updateBookSchema = createBookSchema.fork( bookKeys, schema => schema.optional() ).min(1);//keys are optional, but input cannot be empty


module.exports = {
    create: createBookSchema, 
    update: updateBookSchema,
};
