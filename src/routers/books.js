const {
    getAll,
    get,
    create,
    update,
    del,

} = require( "../controllers/books" );

const handle = 'books';

const routes = ( router ) =>
{
    router.get( `/${ handle }`, getAll );

    router.get( `/${ handle }/select`, get );
    
    router.get( `/${ handle }/:id`, get );

    router.post( `/${ handle }`, create );

    router.patch( `/${ handle }`, update );

    router.patch( `/${ handle }/:id`, update );

    router.delete( `/${ handle }`, del );

    router.delete( `/${ handle }/:id`, del );
};

module.exports = routes;
