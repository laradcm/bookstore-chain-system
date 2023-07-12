/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const createInventory = require( '../../models/factory/createInventory' );
const random = require( '../../helpers/random' );

exports.seed = async function ( knex )
{
  // Deletes ALL existing entries
  await knex( 'inventory' ).del();
  await knex( 'inventory' ).insert( [

    //could be a loop, though it wouldnt be easy to customize

    createInventory( 1, 1, 0, 'in_stock' ),
    createInventory( 2, 1, random( 10 ) ),
    createInventory( 3, 1, random( 10 ) ),
    createInventory( 1, 2, random( 10 ) ),
    createInventory( 2, 2, 0 ),
    createInventory( 3, 2, random( 10 ) ),
    createInventory( 1, 3, random( 10 ) ),
    createInventory( 2, 3, random( 10 ) ),
    createInventory( 3, 3, 0 ),

  ] );
};

