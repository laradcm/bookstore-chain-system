
const knex = require( 'knex' ).default;
const knexFile = require( './knexfile' );
// require( 'dotenv' ).config( { path: '../../.env' } );//brings in environment variables

const env = process.env.NODE_ENV || 'development';
const configOptions = knexFile[ env ];

module.exports = knex( configOptions );//loads db configuration;

