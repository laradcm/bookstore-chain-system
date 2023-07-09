/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const createBook  = require( '../../models/factory/createBook' );

exports.seed = async function ( knex )
{
  // Deletes ALL existing entries
  await knex( 'books' ).del();
  await knex( 'books' ).insert( [

    createBook( 1,
      'Le Petit Prince',

      'Antoine de Saint-Exupéry',

      'The story follows a young prince who visits various planets, including Earth, and addresses themes of loneliness, friendship, love, and loss.'
    ),

    createBook( 2,
      'Dune',

      'Frank Herbert',

      'Dune is set in the distant future amidst a feudal interstellar society in which various noble houses control planetary fiefs. It tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis'
    ),

    createBook( 3,
      'Pride and Prejudice',

      'Jane Austen',

      'The novel follows the character development of Elizabeth Bennet, the protagonist of the book, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.'
    )

  ] );
};
