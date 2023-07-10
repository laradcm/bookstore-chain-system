const {
    getAll,
    getUnique,
    create,
    updateUnique,
    deleteUnique,
} = require( "../controllers/books" );

handle = 'books';

exports[ 'default' ] = ( router ) =>
{
    router.get( `/${ handle }`, getAll );

    router.get( `/${ handle }/:id`, getUnique );

    router.post( `/${ handle }`, create );

    router.patch( `/${ handle }/:id`, updateUnique );

    router.delete( `/${ handle }/:id`, deleteUnique );
};
