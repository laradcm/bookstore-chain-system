
//when a quantity update is requested, attach status to body according to quantity
const invetoryStatusCheck = ( table, body ) =>
{
    if ( table === 'inventory' ) {
        body.status = body.quantity > 0 ? 'in_stock' : 'out_of_stock';
    }

    return body;
};

module.exports = invetoryStatusCheck;