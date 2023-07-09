const random = require( '../../src/helpers/random' );


describe( 'Random Helper Function', () =>
{

    it( 'should return a number', () =>
    {
        const result = random( 10 );

        expect( result ).toEqual( expect.any( Number ) );

    } );


    it( 'should return a number 0-100 by default', () =>
    {
        const result = random();

        expect( result ).toEqual( expect.any( Number ) );
        expect( result ).toBeGreaterThanOrEqual( 0 );
        expect( result ).toBeLessThanOrEqual( 100 );

    } );

    it( 'should return a number within the (1,3) range', () =>
    {
        let result;

        for ( let i = 0; i < 100; i++ ) {
            result = random( 1, 3 );
            expect( result ).toBeGreaterThanOrEqual( 1 );
            expect( result ).toBeLessThanOrEqual( 3 );
        }

    } );



    it( 'should throw if it receives a NaN bad input', () =>
    {
        expect( () =>
        {
            random( "abc" );
        } ).toThrow();

    } );

    it( 'should throw if it receives a negaive number', () =>
    {
        expect( () =>
        {
            random( 0, -10 );
        } ).toThrow();

    } );


    it( 'should throw if upper range number is less than lower range', () =>
    {
        expect( () =>
        {
            random( 10, 1 );
        } ).toThrow();

    } );


} );
