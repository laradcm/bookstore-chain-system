//id validation schema
const Joi = require( 'joi' );
const bookSchema = require( './bookSchema' );
const inventorySchema = require( './inventorySchema' );
const storeSchema = require( './storeSchema' );

const idSchema = Joi.object( {

    id: Joi.number().min( 1 ).required()

} );

bookSchema.id = idSchema;
inventorySchema.id = idSchema;
storeSchema.id = idSchema;


module.exports = {
    bookSchema,
    inventorySchema,
    storeSchema
};



