//called from main app index.js, this function calls a query
//to update the inventory status to 'out_of_stock' if quantity is 0

const dao = require( '../models/dao/inventory' );

const updateStock = async () =>
{
    try {
        const result = await dao.updateStock();
        // console.log(result);
    } catch ( error ) {
        console.log( error );
    }
};

module.exports = updateStock;