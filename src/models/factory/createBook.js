//book factory for testing and seeds templates
const createBook = ( title, author, desc ) =>
{

    const book = {};
    book.title = title;
    book.author = author;
    book.desc = desc;

    return book;

};

module.exports = createBook;

