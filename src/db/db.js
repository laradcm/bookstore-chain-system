const path = require( 'path' );
require( 'dotenv' ).config( { path: path.resolve( './.env' ) } );//brings in environment variables

const knex = require( 'knex' ).default;
const knexFile = require( './knexfile' );

const env = process.env.NODE_ENV || 'development';
console.log(env);
const configOptions = knexFile[ env ];

module.exports = knex( configOptions );//loads db configuration;

