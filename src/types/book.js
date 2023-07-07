//bookstore_inventory datatype
function book( id, title, author, description )
{
    title = title.length > 255 ? title.slice( 255 ) : title;
    author = author.length > 255 ? author.slice( 255 ) : author;
    description = description.length > 255 ? description.slice( 255 ) : description;

    return {
        id,
        title,
        author,
        description
    };

}

module.exports = book;