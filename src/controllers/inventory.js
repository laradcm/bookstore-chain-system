const Controller = require( './template/controller' );
const valModel = require( '../models/validation' );
const dao = require( '../models/dao/inventory' );


const inventoryController = Controller( 'inventory', dao, valModel.inventorySchema );


//Inventory is a child from stores and books and will be automatically created/deleted when its parents are modified
//cleans up unecessary methods from template:
delete inventoryController.create;
delete inventoryController.deleteUnique;


module.exports = inventoryController;


