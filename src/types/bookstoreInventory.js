//bookstore_inventory datatype
function bookstoreInventory( bookstore_id, book_id, quantity )
{
    const status = quantity > 0 ? 'in_stock' : 'out_of_stock';

    return {
        bookstore_id,
        book_id,
        quantity,
        status
    };

}

module.exports = bookstoreInventory;