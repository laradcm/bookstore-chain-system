//inventory validation schema
const Joi = require( 'joi' );

const inventorySchema = Joi.object( {

    bookstore_id:
        [
            Joi.string().pattern( /^[1-9][0-9]*$/, 'numbers min 1' ).required()
            , Joi.number().min( 1 ).required()
        ],

    book_id:
        [
            Joi.string().pattern( /^[1-9][0-9]*$/, 'numbers min 1' ).required()
            , Joi.number().min( 1 ).required()
        ],

    quantity:
        [
            Joi.string().pattern( /^0$|^[1-9][0-9]*$/, 'logical numbers (no 0123)' ).required()
            , Joi.number().required()
        ],

    status: Joi.string().max( 12 ).required(),

} );

module.exports = inventorySchema;
