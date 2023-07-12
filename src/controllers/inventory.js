const Controller = require( './template/controller' );
const valModel = require( '../models/validation' );
const dao = require( '../models/dao/inventory' );


const inventoryController = Controller( 'inventory', dao, valModel.inventorySchema );

//put your custom controller functions here:
//ex inventoryController.myCustomGet =  async (req, res, next) => {...}

//Inventory is a child from stores and books and will be automatically created/deleted when its parents are modified
delete inventoryController.create;      
delete inventoryController.deleteUnique;//cleans up unecessary methods from template


module.exports = inventoryController;


