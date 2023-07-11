//inventory validation schema
const Joi = require( 'joi' );

const createInventorySchema = Joi.object( {

    quantity: Joi.number().min( 1 ).required(),

    status: Joi.string().max( 12 )

} );

const idSchema = Joi.object( {

    store_id: Joi.number().min( 1 ).required(),

    book_id: Joi.number().min( 1 ).required(),

} );

//for update make keys optional
const updateInventorySchema = createInventorySchema.fork( [ 'quantity' ], schema => schema.optional() ).min(1);//keys are optional, but input cannot be empty

module.exports = {
    create: createInventorySchema,
    update: updateInventorySchema,
    id: idSchema,
};
