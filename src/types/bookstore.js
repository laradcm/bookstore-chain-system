//bookstore_inventory datatype
function bookstore( id, name, location )
{
    name = name.length > 255 ? name.slice( 255 ) : name;
    location = location.length > 255 ? location.slice( 255 ) : location;

    return {
        id,
        name,
        location,

    };
}

module.exports = bookstore;