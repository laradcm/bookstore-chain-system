const newGet = require( './get' );
const newCreate = require( './create' );
const newUpdate = require( './update' );
const newDelete = require( './delete' );

//factory function to build CRUD operations controllers
const Controller = ( table, dao, valModel ) =>
{
    const controller = {};
    const get = newGet( table, dao, valModel );
    const create = newCreate( table, dao, valModel );
    const update = newUpdate( table, dao, valModel );
    const deletes = newDelete( table, dao, valModel );

    //------------gets------------------------------------------
    controller.getAll = get.getAll;
    controller.getUnique = get.getUnique;


    //---------------creates------------------------------------
    controller.create = create.create;


    //---------------updates------------------------------------
    controller.updateUnique = update.updateUnique;


    //--------------deletes-------------------------------------
    controller.deleteUnique = deletes.deleteUnique;

    return controller;
};

module.exports = Controller;

