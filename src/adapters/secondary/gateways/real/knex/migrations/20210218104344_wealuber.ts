import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('ubers', function (t) {
      t.uuid('id').primary();
    })
    .createTable('bookings', function (t) {
      t.uuid('id').primary();
      t.uuid('uberId').notNullable();
      t.uuid('customerId').notNullable();
      t.json('startPoint').notNullable();
      t.json('endPoint').notNullable();
      t.integer('price').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bookings').dropTable('ubers');
}
