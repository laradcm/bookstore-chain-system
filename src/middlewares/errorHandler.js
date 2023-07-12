//handles errors caught from the controllers
//error is routed here using the next(err) method from the controllers
//you can see this middleware call from index.js

function errorHandler( err, req, res, next )
{
  console.error( err.stack );
  res.status( 500 ).json( { message: err.message } );
}

module.exports = errorHandler;
