


require( 'dotenv' ).config( { path: '../../.env' } );//brings in environment variables
const knex = require( 'knex' ).default;
const knexFile = require( '../../src/db/knexfile' );
const db = knex( knexFile.test );

//setup

beforeAll( async () => //populates test db
{
    const dbSetup = knex( knexFile.test );

    try {
        await dbSetup.migrate.rollback( { directory: '../../src/db/migrations' } );
        await dbSetup.migrate.latest( { directory: '../../src/db/migrations' } );
        await dbSetup.seed.run( { directory: '../../src/db/seeds' } );

    } catch ( error ) {
        console.error( error.stack );

    } finally {
        dbSetup.destroy(); //knex does not hang after node operations, it needs to be done manually by destroying the connection
    }

} );


//test
describe( 'database', () =>
{

    it( 'db test connection test', () =>
    {
        const query = "select 1+1 as result";
        expect( db.raw( query ) ).resolves;

    } );

    it( 'db dev connection test', () =>
    {
        const query = "select 1+1 as result";
        expect( knex( knexFile.development ).raw( query ) ).resolves;

    } );

    it( 'db production connection test', () =>
    {
        const query = "select 1+1 as result";
        expect( knex( knexFile.production ).raw( query ) ).resolves;

    } );


    it( 'should read data', async () =>
    {

        const query = "select * from books";
        const result = await db.raw( query );

        expect( result.rowCount ).toBeGreaterThan( 0 );

    } );

    it( 'should read correct data', async () =>
    {

        const query = "select id from books where id=1";
        const result = await db.raw( query );

        expect( result.rows[ 0 ].id ).toBe( 1 );

    } );

    it( 'should insert data', async () =>
    {
        const book = {
            title: "Title 1",
            author: "Author 1",
            desc: "Desc 1"
        };

        const result = await db( 'books' ).insert( book );

        expect( result.rowCount ).toBe( 1 );

    } );

    it( 'should insert correct data', async () =>
    {
        const book = {
            title: "Title 2",
            author: "Author 2",
            desc: "Desc 2"
        };

        await db( 'books' ).insert( book );

        const result = await db( 'books' ).where( 'title', book.title );

        expect( result[ 0 ].title ).toBe( book.title );

    } );

    it( 'should delete data', async () =>
    {

        const book = {
            title: "Title 3",
            author: "Author 3",
            desc: "Desc 3"
        };

        await db( 'books' ).insert( book );

        const result = await db( 'books' ).where( 'title', book.title ).del();

        expect( result ).toBe( 1 );

    } );

} );

afterAll( () =>
{
    db.destroy();
} )


