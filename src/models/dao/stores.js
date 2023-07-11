const Dao = require( './dao' );
const db = require( '../../db/db' );
const table = 'stores';

const storesDao = Dao( table, db );

//extended storesDao for future custom create mod TODO


module.exports = storesDao;

