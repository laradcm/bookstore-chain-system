//book validation schema
const Joi = require( 'joi' );

const createStoreSchema = Joi.object( {

    name: Joi.string().max( 255 ).required(),

    location: Joi.string().max( 255 ).required(),

} );

const storeKeys = Object.keys( createStoreSchema.describe().keys );
const updateStoreSchema = createStoreSchema.fork( storeKeys, schema => schema.optional() );

module.exports = {
    create: createStoreSchema,
    update: updateStoreSchema,
};
