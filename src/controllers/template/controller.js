const newGet = require( './get' );
const newCreate = require( './create' );
const newUpdate = require( './update' );
const newDelete = require( './delete' );
const validation = require( './validation' );

//factory function to build CRUD operations controllers
const Controller = ( table, dao, valModel ) =>
{
    const controller = {};
    const get = newGet( table, dao, valModel, validation );
    const create = newCreate( table, dao, valModel, validation );
    const update = newUpdate( table, dao, valModel, validation );
    const deletes = newDelete( table, dao, valModel, validation );

    //------------gets------------------------------------------
    controller.getAll = get.getAll;
    controller.getUnique = get.getUnique;


    //---------------creates------------------------------------
    controller.create = create.create;


    //---------------updates------------------------------------
    controller.updateUnique = update.updateUnique;
    controller.updateMany = update.updateMany;


    //--------------deletes-------------------------------------
    controller.deleteUnique = deletes.deleteUnique;

    return controller;
};

module.exports = Controller;

