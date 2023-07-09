const knex = require( 'knex' );
const knexFile = require( './knexfile' );
require('dotenv').config({ path: '../../.env' });//brings in environment variables

const db = knex( knexFile[ process.env.DB_MODE ] );//loads db configuration
module.exports = db;




