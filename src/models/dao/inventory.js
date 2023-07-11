const Dao = require( './dao' );
const db = require( '../../db/db' );
const table = 'inventory';

const inventoryDao = Dao( table, db );

inventoryDao.updateStock = async () =>
{
   return await db( table ).where({
        quantity: 0,
        status:  'in_stock'
      }).update( 'status', 'out_of_stock' );
};


//Inventory is a child from stores and books and will be automatically created/deleted when its parents are modified
//cleans up unecessary methods from template:
delete inventoryDao.create;
delete inventoryDao.deleteUnique;

module.exports = inventoryDao;

