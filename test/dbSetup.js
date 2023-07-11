
const path = require( 'path' );
const knex = require( 'knex' ).default;
const knexFile = require( '../src/db/knexfile' );


const dbInit = async () => //populates test DB
{
    const db = knex( knexFile.test );

    try {
        await db.migrate.rollback( { directory: path.resolve( './src/db/migrations' ) } );
        await db.migrate.latest( { directory: path.resolve( './src/db/migrations' ) } );
        await db.seed.run( { directory: path.resolve( './src/db/seeds' ) } );

    } catch ( error ) {
        console.error( error );

    } finally {
        db.destroy(); //knex does not hang after cmd operations, it needs to be done manually by destroying the connection
    }
};


const dbReset = async () =>//resets test DB
{
    const db = knex( knexFile.test );

    try {
        await db.migrate.rollback( { directory: path.resolve( './src/db/migrations' ) } );

    } catch ( error ) {
        console.error( error );

    } finally {
        db.destroy();
    }
};

module.exports = {
    dbInit,
    dbReset
}


