//function to generate inventory data to insert when a store or book is created
const generateInventory = ( stores, books ) =>
{
    const inventory = [];

    for ( const store of stores ) {
        for ( const book of books ) {

            inventory.push( {
                store_id: store.id,
                book_id: book.id,
                quantity: 0,
                status: 'out_of_stock'
                
            } );
        }
    }

    return inventory;
};

module.exports = generateInventory;