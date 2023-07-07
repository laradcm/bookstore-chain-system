/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function ( knex )
{
    return knex.schema
        .createTable( 'books', function ( table )
        {
            table.increments( 'id' );
            table.string( 'title', 255 ).notNullable();
            table.string( 'author', 255 ).notNullable();
            table.string( 'description', 255 ).notNullable();
        } )
        .createTable( 'bookstores', function ( table )
        {
            table.increments( 'id' );
            table.string( 'name', 255 ).notNullable().unique();
            table.string( 'location', 255 ).notNullable();
        } )
        .createTable( 'bookstore_inventory', function ( table )
        {
            table.primary( [ 'bookstore_id', 'book_id' ] );

            table.integer( 'bookstore_id' )
                .notNullable()
                .unsigned();

            table.integer( 'book_id' )
                .notNullable()
                .unsigned();

            table.integer( 'quantity' )
                .notNullable()
                .defaultTo( 0 );

            table.string( 'status', 12 )
                .notNullable()
                .defaultTo( 'out_of_stock' )
                .checkIn( [ 'out_of_stock', 'in_stock' ] );

            table.foreign( 'bookstore_id' )
                .references( 'id' )
                .inTable( 'bookstores' )
                .onDelete( 'cascade' );

            table.foreign( 'book_id' )
                .references( 'id' )
                .inTable( 'books' )
                .onDelete( 'cascade' );
        } );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function ( knex )
{
    return knex.schema
        .dropTable( 'bookstore_inventory' )
        .dropTable( 'bookstores' )
        .dropTable( 'books' );
};
