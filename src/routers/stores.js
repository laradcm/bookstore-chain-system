const {
    getAll,
    getUnique,
    create,
    update,
    deleteUnique,
    
} = require( "../controllers/stores" );

const handle = 'stores';

const routes = ( router ) =>
{
    router.get( `/${ handle }`, getAll );

    router.get( `/${ handle }/:id`, getUnique );

    router.post( `/${ handle }`, create );

    router.patch( `/${ handle }`, update );

    router.patch( `/${ handle }/:id`, update );//for batch or body only update

    router.delete( `/${ handle }/:id`, deleteUnique);
};

module.exports = routes;
