const { dbInit, dbReset } = require( '../../dbSetup' );
const dao = require( '../../../src/models/dao/inventory' );
const table = 'inventory';

//setup
beforeAll( async () => //populates test db
{
    await dbInit();

} );


//test
describe( 'Inventory DAO', () =>
{

    it( 'should read data', async () =>
    {
        const result = await dao.getAll();
        expect( result.length ).toBeGreaterThan( 0 );

    } );

    it( 'should read correct data', async () =>
    {
        const result = await dao.getOne( { store_id: 2, book_id: 2 } );

        expect( result[ 0 ].store_id ).toBe( 2 );
        expect( result[ 0 ].book_id ).toBe( 2 );

    } );

    it( 'should read correct batch data', async () =>
    {
        const result = await dao.get( [ { store_id: 1, book_id: 1 }, { store_id: 2, book_id: 2 } ] );

        expect( result[ 0 ].store_id ).toBe( 1 );
        expect( result[ 0 ].book_id ).toBe( 1 );

        expect( result[ 1 ].store_id ).toBe( 2 );
        expect( result[ 1 ].book_id ).toBe( 2 );

    } );

    it( 'should update data', async () =>
    {
        const id = { store_id: 2, book_id: 2 };
        const entry = {
            quantity: 2,
            status: 'in_stock'
        };

        const result = await dao.updateOne( id, entry );
        expect( result ).toBe( 1 );

    } );

    it( 'should update correct data', async () =>
    {
        const id = { store_id: 2, book_id: 2 };
        const entry = { quantity: 5 };

        await dao.updateOne( id, entry );
        const result = await dao.getOne( id );

        expect( result[ 0 ] ).toEqual(
            {
                store_id: 2,
                book_id: 2,
                quantity: 5,
                status: 'in_stock'
            } );
    } );

    it( 'should update stock if qty is 0', async () =>
    {
        const id = { store_id: 2, book_id: 2 };
        const entry = {
            quantity: 0,
            status: 'in_stock'
        };

        await dao.connection( table )//force in_stock value
            .where( id )
            .update( entry );

        const result = await dao.updateStock();
        expect( result ).toBeGreaterThan( 0 );

    } );

} );


//wrap
afterAll( async () =>
{
    await dbReset();

    dao.connection.destroy();

} );
