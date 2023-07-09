const express = require( 'express' );
const router = express.Router();

const book = require( './books' )['default'];

exports['default'] = ( ) =>
{
    book( router );
    return router;
};