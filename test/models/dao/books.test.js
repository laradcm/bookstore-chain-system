const { dbInit, dbReset } = require( '../../dbSetup' );
const storesDao = require( '../../../src/models/dao/stores' );
const dao = require( '../../../src/models/dao/books' );
const createEntry = require( '../../../src/models/factory/createBook' );
const table = 'books';

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
        const result = await dao.getOne( { id: 1 } );

        expect( result[ 0 ].id ).toBe( 1 );

    } );

    it( 'should read correct batch data', async () =>
    {
        const result = await dao.get( [ { id: 1 }, { id: 2 } ] );

        expect( result[ 0 ].id ).toBe( 1 );
        expect( result[ 1 ].id ).toBe( 2 );

    } );

    it( 'should create data', async () =>
    {
        const entry = createEntry( 'Title 1', 'Auhtor 1', 'Desc 1' );

        const result = await dao.create( entry );
        expect( result.result.length ).toBeGreaterThan( 0 );

    } );

    it( 'should create inventory instance in every store', async () =>
    {
        const entry = createEntry( 'Title 1', 'Auhtor 1', 'Desc 1' );

        const stores = await storesDao.getAll();
        const result = await dao.create( entry );

        expect( result.effects.length ).toBeGreaterThan( 0 );
        expect( result.effects.length ).toBe( stores.length );

    } );

    it( 'should update correct data', async () =>
    {
        const id = { id: 1 };
        const entry = createEntry( 'Title 2' );
        const key = Object.keys( entry )[ 0 ];

        await dao.updateOne( id, entry );
        const result = await dao.getOne( id );

        expect( result[ 0 ].id ).toBe( 1 );
        expect( result[ 0 ][ key ] ).toBe( entry[ key ] );

    } );

    it( 'should update many correctly', async () =>
    {
        //prep data
        const ids = [ { id: 1 }, { id: 2 }, { id: 3 } ];

        const entry = ids.map( ( id ) => createEntry( `Title Many ${ id.id }` ) );
        const key = Object.keys( entry[ 0 ] )[ 0 ];

        //update and check
        const result = await dao.update( ids, entry );
        expect( result ).toBe( ids.length );

        //get data
        const resultData = await dao.get( ids );

        //compare
        let i = 0;
        resultData.forEach( ( data ) =>
        {
            expect( data[ key ] ).toBe( entry[ i ][ key ] );
            i++;
        } );

    } );

    it( 'should delete correct data', async () =>
    {
        const id = { id: 1 };

        const resultDeletion = await dao.deleteOne( id );
        const result = await dao.getOne( id );

        expect( resultDeletion ).toBe( 1 );
        expect( result ).toEqual( [] );

    } );

    it( 'should delete many', async () =>
    {
        const ids = [ { id: 2 }, { id: 3 }, { id: 4 } ];

        const resultDeletion = await dao.delete( ids );
        expect( resultDeletion ).toBe( ids.length );

    } );

} );


//wrap
afterAll( async () =>
{
    await dbReset();

    dao.connection.destroy();

} );
