//book validation schema
const Joi = require( 'joi' );

const createStoreSchema = Joi.object( {

    name: Joi.string().max( 255 ).required(),

    location: Joi.string().max( 255 ).required(),

} );

//for update make keys optional
const storeKeys = Object.keys( createStoreSchema.describe().keys );
const updateStoreSchema = createStoreSchema.fork( storeKeys, schema => schema.optional() ).min(1);//keys are optional, but input cannot be empty

module.exports = {
    create: createStoreSchema,
    update: updateStoreSchema,
};
