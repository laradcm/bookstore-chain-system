const { dbInit, dbReset } = require( '../../dbSetup' );
const dao = require( '../../../src/models/dao/books' );
const createEntry = require( '../../../src/models/factory/createBook' );


//setup
beforeAll( async () => //populates test db
{
    await dbInit();

} );


//test
describe( 'books DAO', () =>
{

    it( 'should read data', async () =>
    {
        const result = await dao.getAll();
        expect( result.length ).toBeGreaterThan( 0 );

    } );

    it( 'should read correct data', async () =>
    {
        const result = await dao.getUnique( { id: 1 } );

        expect( result[ 0 ].id ).toBe( 1 );

    } );

    it( 'should create data', async () =>
    {
        const entry = createEntry( 'Title 1', 'Auhtor 1', 'Desc 1' );

        const result = await dao.create( entry );
        expect( result ).toBeGreaterThan( 0 );

    } );

    it( 'should update correct data', async () =>
    {
        const id = { id: 1 };
        const entry = createEntry( 'Title 2' );
        const key = Object.keys( entry )[ 0 ];

        await dao.updateUnique( id, entry );
        const result = await dao.getUnique( id );
        expect( result[ 0 ].id ).toBe( 1 );
        expect( result[ 0 ][ key ] ).toBe( entry[ key ] );


    } );

    it( 'should delete correct data', async () =>
    {
        const id = { id: 1 };

        const resultDeletion = await dao.deleteUnique( id );
        const result = await dao.getUnique( id );
        expect( resultDeletion ).toBe( 1 );
        expect( result ).toEqual( [] );

    } );

} );


//wrap
afterAll( async () =>
{
    await dbReset();

    dao.connection.destroy();

} );
