const {
    getAll,
    getUnique,
    update,

} = require( "../controllers/inventory" );

const handle = 'inventory';

const routes = ( router ) =>
{   
    router.get( `/${ handle }`, getAll );

    router.get( `/${ handle }/:store_id/:book_id`, getUnique );

    router.patch( `/${ handle }`, update );//for batch or body only update

    router.patch( `/${ handle }/:store_id/:book_id`, update );

};

module.exports = routes;