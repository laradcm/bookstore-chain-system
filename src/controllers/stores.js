const valModel = require( '../models/validation' );
const dao = require( '../models/dao/stores' );
const Controller = require( './template/controller' );


const storesController = Controller('stores', dao, valModel.storeSchema);

//put your custom controller functions here:
//ex storesController.myCustomGet =  async (req, res, next) => {...}

module.exports = storesController;