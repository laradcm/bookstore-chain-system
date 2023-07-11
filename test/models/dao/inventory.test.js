const path = require( 'path' );
const knex = require( 'knex' ).default;
const knexFile = require( '../../../src/db/knexfile' );
const dao = require( '../../../src/models/dao/inventory' );


//setup
beforeAll( async () => //populates test db
{
    const db = knex( knexFile.test );

    try {
        await db.migrate.rollback( { directory: path.resolve( './src/db/migrations' ) } );
        await db.migrate.latest( { directory: path.resolve( './src/db/migrations' ) } );
        await db.seed.run( { directory: path.resolve( './src/db/seeds' ) } );

    } catch ( error ) {
        console.error( error.stack );

    } finally {
        db.destroy(); //knex does not hang after node operations, it needs to be done manually by destroying the connection
    }

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
        const result = await dao.getUnique( { store_id: 2, book_id: 2 } );

        expect( result[ 0 ].store_id ).toBe( 2 );
        expect( result[ 0 ].book_id ).toBe( 2 );

    } );

    it( 'should update data', async () =>
    {
        const id = { store_id: 2, book_id: 2 };
        const entry = {
            quantity: 2,
            status: 'in_stock'
        };

        const result = await dao.updateUnique( id, entry );
        expect( result ).toBe( 1 );

    } );

    it( 'should update correct data', async () =>
    {
        const id = { store_id: 2, book_id: 2 };
        const entry = {
            quantity: 5,
            status: 'in_stock'
        };

        await dao.updateUnique( id, entry );
        const result = await dao.getUnique( id );
        expect( result[ 0 ].store_id ).toBe( 2 );
        expect( result[ 0 ].book_id ).toBe( 2 );

    } );

} );


afterAll( async () =>
{
    const db = knex( knexFile.test );

    try {
        await db.migrate.rollback( { directory: path.resolve( './src/db/migrations' ) } );

    } catch ( error ) {
        console.error( error );
    } finally {
        db.destroy();
        dao.connection.destroy();
    }

} );
