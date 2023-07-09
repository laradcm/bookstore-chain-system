//book object structure
const createBook = ( title, author, desc ) =>
{

    const book = {};
    book.title = title;
    book.author = author;
    book.desc = desc;

    return book;

};

module.exports = createBook;


