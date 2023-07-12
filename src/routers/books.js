const {
    getAll,
    getUnique,
    create,
    update,
    deleteUnique,

} = require( "../controllers/books" );

const handle = 'books';

const routes = ( router ) =>
{
    router.get( `/${ handle }`, getAll );

    router.get( `/${ handle }/:id`, getUnique );

    router.post( `/${ handle }`, create );

    router.patch( `/${ handle }`, update );//for batch or body only update

    router.patch( `/${ handle }/:id`, update );

    router.delete( `/${ handle }/:id`, deleteUnique );
};

module.exports = routes;
