//inventory validation schema
const Joi = require( 'joi' );

const createInventorySchema = Joi.object( {

    bookstore_id: Joi.number().min( 1 ).required(),

    book_id: Joi.number().min( 1 ).required(),

    quantity: Joi.number().min( 1 ).required(),

    status: Joi.string().max( 12 ).required(),

} );

const updateInventorySchema = createInventorySchema.fork( [ 'quantity' ], schema => schema.optional() );

module.exports = {
   create: createInventorySchema,
   update: updateInventorySchema,
};
