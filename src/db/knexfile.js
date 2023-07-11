const path = require( 'path' );
require( 'dotenv' ).config( { path: path.resolve( './.env' ) } );//brings in environment variables for jest execution
require('dotenv').config({ path: '../../.env' });//brings in environment variables for knex execution( it breaks if the path is not absolute)

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DEV_DATABASE,
      user: process.env.DEV_USERNAME,
      password: process.env.DEV_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: process.env.TEST_DATABASE,
      user: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.PROD_DATABASE,
      user: process.env.PROD_USERNAME,
      password: process.env.PROD_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
