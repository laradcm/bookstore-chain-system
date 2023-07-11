
const knex = require( 'knex' ).default;
const knexFile = require( '../../src/db/knexfile' );
const { dbInit, dbReset } = require( '../dbSetup' );

const createEntry = require( '../../src/models/factory/createBook' );
const db = knex( knexFile.test );
const table = 'books';


//setup
beforeAll( async () => 
{
    await dbInit();//populates test DB

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

        const query = `select * from ${ table }`;
        const result = await db.raw( query );

        expect( result.rowCount ).toBeGreaterThan( 0 );

    } );

    it( 'should read correct data', async () =>
    {

        const query = `select id from ${ table } where id=1`;
        const result = await db.raw( query );

        expect( result.rows[ 0 ].id ).toBe( 1 );

    } );

    it( 'should insert data', async () =>
    {
        const entry = createEntry( 'Title 1', 'Auhtor 1', 'Desc 1' );
        const result = await db( table ).insert( entry );

        expect( result.rowCount ).toBe( 1 );

    } );

    it( 'should insert correct data', async () =>
    {
        const entry = createEntry( 'Title 2', 'Auhtor 2', 'Desc 2' );
        const key = Object.keys( entry )[ 0 ];

        await db( table ).insert( entry );

        const result = await db( table ).where( key, entry[ key ] );

        expect( result[ 0 ][ key ] ).toBe( entry[ key ] );

    } );

    it( 'should delete data', async () =>
    {

        const entry = createEntry( 'Title 3', 'Auhtor 3', 'Desc 3' );
        const key = Object.keys( entry )[ 0 ];

        await db( table ).insert( entry );

        const result = await db( table ).where( key, entry[ key ] ).del();

        expect( result ).toBeGreaterThan( 0 );

    } );

} );


//wrap
afterAll( async () =>
{
    db.destroy();//destroys connection made for the tests

    await dbReset();//resets test DB

} )


