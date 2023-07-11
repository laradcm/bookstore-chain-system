const {
    getAll,
    getUnique,
    create,
    updateUnique,
    deleteUnique,
    
} = require( "../controllers/stores" );

const handle = 'stores';

const routes = ( router ) =>
{
    router.get( `/${ handle }`, getAll );

    router.get( `/${ handle }/:id`, getUnique );

    router.post( `/${ handle }`, create );

    router.patch( `/${ handle }/:id`, updateUnique );

    router.delete( `/${ handle }/:id`, deleteUnique);
};

module.exports = routes;
