/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bookstore = require( '../../types/bookstore' );

exports.seed = async function ( knex )
{
  // Deletes ALL existing entries
  await knex( 'bookstores' ).del();
  await knex( 'bookstores' ).insert( [

    bookstore( 1,
      'That one',
      'Hochelaga'
    ),
    bookstore( 2,
      'The other one',
      'Downtown'
    ),
    bookstore( 3,
      'My favorite one',
      'St.Henri'
    ),

  ] );
};
