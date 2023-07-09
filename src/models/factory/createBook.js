//book object structure
const createBook = ( id, title, author, desc ) =>
{

    const book = {};
    book.id = id;
    book.title = title;
    book.author = author;
    book.desc = desc;

    return book;

};

module.exports = createBook;


