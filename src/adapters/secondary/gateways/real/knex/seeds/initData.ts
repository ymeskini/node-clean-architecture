import { Knex } from 'knex';

export async function seed(knex: Knex) {
  return Promise.all([
    knex('ubers').del(),
    knex('bookings').del(),
    knex('ubers').insert({
      id: 'c804a85c-a230-437b-85db-8cd61b2819f9',
    }),
  ]);
}
