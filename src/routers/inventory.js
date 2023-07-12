const {
    getAll,
    get,
    update,

} = require( "../controllers/inventory" );

const handle = 'inventory';

const routes = ( router ) =>
{   
    router.get( `/${ handle }`, getAll );

    router.get( `/${ handle }/select`, get );

    router.get( `/${ handle }/:store_id/:book_id`, get );

    router.patch( `/${ handle }`, update );

    router.patch( `/${ handle }/:store_id/:book_id`, update );

};

module.exports = routes;