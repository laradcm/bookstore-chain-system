const { dbInit, dbReset } = require( '../../dbSetup' );
const booksDao = require( '../../../src/models/dao/books' );
const dao = require( '../../../src/models/dao/stores' );
const createEntry = require( '../../../src/models/factory/createStore' );

//setup
beforeAll( async () => //populates test db
{
    await dbInit();

} );


//test
describe( 'stores DAO', () =>
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

    it( 'should create data', async () =>
    {
        const entry = createEntry( 'Name 1', 'Location 1' );

        const result = await dao.create( entry );
        expect( result.result.length ).toBeGreaterThan( 0 );

    } );

    it( 'should create inventory instance for every book', async () =>
    {
        const entry = createEntry( 'Name 2', 'Location 2' );

        const books = await booksDao.getAll();
        const result = await dao.create( entry );

        expect( result.effects.length ).toBeGreaterThan( 0 );
        expect( result.effects.length ).toBe( books.length );

    } );

    it( 'should update correct data', async () =>
    {
        const id = { id: 1 };
        const entry = createEntry( 'Name One' );
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

        const entry = ids.map( ( id ) => createEntry( `Stores Many ${ id.id }` ) );
        const key = Object.keys( entry[ 0 ] )[ 0 ];

        //update and check
        const result = await dao.update( ids, entry );
        expect( result ).toBe( ids.length );

        //get data
        const resultData = await dao.get( ids )

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
