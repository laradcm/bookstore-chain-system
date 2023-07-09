/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const createStore = require( '../../models/factory/createStore'  );

exports.seed = async function ( knex )
{
  // Deletes ALL existing entries
  await knex( 'stores' ).del();
  await knex( 'stores' ).insert( [

    createStore( 1,
      'That one',
      'Hochelaga'
    ),
    createStore( 2,
      'The other one',
      'Downtown'
    ),
    createStore( 3,
      'My favorite one',
      'St.Henri'
    ),

  ] );
};
