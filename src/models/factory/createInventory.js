//inventory object structure
const createInventory = ( store_id, book_id, quantity, status ) =>
{
    if ( !status ) {
        status = quantity > 0 ? 'in_stock' : 'out_of_stock';
    }
    
    const inventory = {};
    inventory.store_id = store_id;
    inventory.book_id = book_id;
    inventory.quantity = quantity;
    inventory.status = status;

    return inventory;

}

module.exports = createInventory;