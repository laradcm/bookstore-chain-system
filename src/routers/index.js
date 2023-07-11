const express = require( 'express' );
const router = express.Router();

const books = require( './books' );
const stores = require( './stores' );

const route = () => //builds router with other routes, see definitions for details
{   
    books( router );
    stores( router );
    return router;
};

module.exports = route;