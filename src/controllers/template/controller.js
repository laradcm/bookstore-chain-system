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
    controller.get = get.get;


    //---------------creates------------------------------------
    controller.create = create.create;


    //---------------updates------------------------------------
    controller.update = update.update;


    //--------------deletes-------------------------------------
    controller.del = deletes.del;

    return controller;
};

module.exports = Controller;

