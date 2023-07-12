const path = require( 'path' );
require( 'dotenv' ).config( { path: path.resolve( './.env' ) } );//brings in environment variables for jest script execution
require('dotenv').config({ path: '../../.env' });//brings in environment variables for knex script execution

const knex = require( 'knex' ).default;
const knexFile = require( './knexfile' );

const env = process.env.NODE_ENV || 'development';
const configOptions = knexFile[ env ];

module.exports = knex( configOptions );//loads db configuration;

