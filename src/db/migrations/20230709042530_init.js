/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) 
{
    return knex.schema
        .createTable( 'books', function ( table )
        {
            table.increments( 'id' );
            table.string( 'title', 255 ).notNullable();
            table.string( 'author', 255 ).notNullable();
            table.string( 'desc', 255 ).notNullable();
        } )
        .createTable( 'stores', function ( table )
        {
            table.increments( 'id' );
            table.string( 'name', 255 ).notNullable().unique();
            table.string( 'location', 255 ).notNullable();
        } )
        .createTable( 'inventory', function ( table )
        {
            table.primary( [ 'store_id', 'book_id' ] );

            table.integer( 'store_id' )
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
                .defaultTo( 'in_stock' )//since we have the updateStock periodic task to check and set it to 'out_of_stock if needed'
                .checkIn( [ 'out_of_stock', 'in_stock' ] );

            table.foreign( 'store_id' )
                .references( 'id' )
                .inTable( 'stores' )
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
exports.down = function(knex) 
{
    return knex.schema
        .dropTable( 'inventory' )
        .dropTable( 'stores' )
        .dropTable( 'books' );
};
