exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('ubers', function (t) {
            t.uuid('id').primary();
        })
        .createTable('bookings', function (t) {
            t.uuid('id').primary();
            t.uuid('uber_id').notNullable();
            t.uuid('customer_id').notNullable();
            t.integer('start_lat').notNullable();
            t.integer('end_lat').notNullable();
            t.integer('start_lon').notNullable();
            t.integer('end_lon').notNullable();
            t.integer('price').notNullable();
        });

};

exports.down = function (knex) {
    return knex.schema.dropTable('bookings')
        .dropTable('ubers');
};

