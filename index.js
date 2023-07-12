require( 'dotenv' ).config();
const express = require( "express" );
const cors = require( "cors" );
const reqTracking = require( './src/middlewares/reqTracking' );
const errorHandler = require( './src/middlewares/errorHandler' );
const router = require( './src/routers' );
const updateStock = require('./src/helpers/updateStock')
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

const app = express();

const corsOptions = {
  origin: "*", // to be changed to the port num or specific domain for security
  optionsSuccessStatus: 200, //200 for legacy browsers, 204 is default
};

//middlewares
app.use( cors( corsOptions ) );
app.use( express.json() );
app.use( reqTracking );

//routing
app.use( '/', router() );

//error handler
app.use(errorHandler);

//serve static landing page
app.use( express.static( "public" ) );

//listen
app.listen( PORT, HOST, () =>
{
  console.log( "listening on port:" + PORT );
} );


//books stocks watch ----------
setInterval(updateStock, 60000);
