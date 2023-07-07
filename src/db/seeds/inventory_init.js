/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bookstoreInventory = require( '../../types/bookstoreInventory' );
const random = require( '../../helpers/random' );

exports.seed = async function ( knex )
{
  // Deletes ALL existing entries
  await knex( 'bookstore_inventory' ).del();
  await knex( 'bookstore_inventory' ).insert( [
    bookstoreInventory( 1, 1, random( 10 ) ), //random is 0-10
    bookstoreInventory( 2, 1, random( 10 ) ),
    bookstoreInventory( 3, 1, random( 10 ) ),
    bookstoreInventory( 1, 2, random( 10 ) ),
    bookstoreInventory( 2, 2, random( 10 ) ),
    bookstoreInventory( 3, 2, random( 10 ) ),
    bookstoreInventory( 1, 3, random( 10 ) ),
    bookstoreInventory( 2, 3, random( 10 ) ),
    bookstoreInventory( 3, 3, random( 10 ) ),
  ] );
};
