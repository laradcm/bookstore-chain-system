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

    createStore(
      'That one',
      'Hochelaga'
    ),
    createStore(
      'The other one',
      'Downtown'
    ),
    createStore(
      'My favorite one',
      'St.Henri'
    ),

  ] );
};
