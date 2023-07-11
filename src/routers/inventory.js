const {
    getAll,
    getUnique,
    updateUnique,

} = require( "../controllers/inventory" );

const handle = 'inventory';

const routes = ( router ) =>
{   
    router.get( `/${ handle }`, getAll );

    router.get( `/${ handle }/:store_id/:book_id`, getUnique );

    router.patch( `/${ handle }/:store_id/:book_id`, updateUnique );

};

module.exports = routes;