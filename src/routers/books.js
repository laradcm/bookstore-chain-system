const controller = require( "../controllers/books" );

exports[ 'default' ] = ( router ) =>
{
    router.get( "/books", controller.getBooks );
    router.get( "/books/:id", controller.getBookById );
};
