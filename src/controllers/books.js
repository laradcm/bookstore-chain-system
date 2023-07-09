const dao = require( '../models/dao/books' );


const getBooks = async ( req, res, next ) =>
{
    try {
        res.json( await dao.getBooks() );
    } catch ( err ) {
        err.message = `Error while getting books: ` + err.message;
        next( err );
    }
};

const getBookById = async ( req, res, next ) =>
{
    try {
        res.json( await dao.getBookById(req.params.id) );
    } catch ( err ) {
        err.message = `Error while getting books: ` + err.message;
        next( err );
    }
};


module.exports = {
    getBooks,
    getBookById,
}