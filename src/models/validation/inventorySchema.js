//inventory validation schema
const Joi = require( 'joi' );

const createInventorySchema = Joi.object( {

    quantity: Joi.number().required(),

    status: Joi.string().max( 12 ).forbidden()//user should not modify this

} );

const idSchema = Joi.object( {

    store_id: Joi.number().min( 1 ).required(),

    book_id: Joi.number().min( 1 ).required(),

} );

//for the controller template and in case of future changes
const updateInventorySchema = createInventorySchema;

module.exports = {
    create: createInventorySchema,
    update: updateInventorySchema,
    id: idSchema,
};
