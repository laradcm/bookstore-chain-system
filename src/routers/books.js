const {
    getAll,
    getUnique,
    create,
    update,
    del,

} = require( "../controllers/books" );

const handle = 'books';

const routes = ( router ) =>
{
    router.get( `/${ handle }`, getAll );

    router.get( `/${ handle }/:id`, getUnique );

    router.post( `/${ handle }`, create );

    router.patch( `/${ handle }`, update );//body only update

    router.patch( `/${ handle }/:id`, update );

    router.delete( `/${ handle }`, del );//body only del

    router.delete( `/${ handle }/:id`, del );
};

module.exports = routes;
