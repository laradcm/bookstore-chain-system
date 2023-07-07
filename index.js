const express = require( "express" );
const dotenv = require( "dotenv" );
const cors = require( "cors" );
const PORT = +process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

const app = express();
dotenv.config();

const corsOptions = {
  origin: "*", // to be changed to the port num or specific domain for security
  optionsSuccessStatus: 200, //200 for legacy browsers, 204 is default
};

//middlewares
app.use( cors( corsOptions ) );
app.use( express.json() );


//routing


//serve static landing page
app.use( express.static( "public" ) );

//listen
app.listen( PORT, HOST, () =>
{
  console.log( "listening on port:" + PORT );
} );
