const Dao = require( './dao' );
const db = require( '../../db/db' );
const generateInventory = require( '../../helpers/generateInventory' );
const table = 'inventory';

const inventoryDao = Dao( table, db );

//custom dao functions:

inventoryDao.updateOne = async ( id, body, trx = false ) =>
{
  body.status = body.quantity > 0 ? 'in_stock' : 'out_of_stock';//attaches status to body

  const dbSelect = trx ? trx : db;

  const result = await dbSelect( table )
    .where( id )
    .update( body );

  return result;
};


inventoryDao.updateStock = async () =>//for periodic stock check task
{
  return await db( table ).where(
    {
      quantity: 0,
      status: 'in_stock'
    } )
    .update( 'status', 'out_of_stock' );

};


//Inventory is a child from stores and books and will be automatically created/deleted when its parents are modified

inventoryDao.create = async ( trx, storesIds, booksIds ) =>//called internally from books and stores
{
  const data = generateInventory( storesIds, booksIds );
  return await trx( table ).insert( data, [ 'store_id', 'book_id' ] );

};


//cleans up unecessary methods from template:
delete inventoryDao.deleteOne;
delete inventoryDao.delete;


module.exports = inventoryDao;

