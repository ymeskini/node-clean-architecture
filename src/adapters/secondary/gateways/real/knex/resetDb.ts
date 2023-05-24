import { Knex } from 'knex';
import { each } from 'bluebird';

const tables = ['bookings', 'ubers'] as const;

export async function resetDB(sqlConnection: Knex) {
  await sqlConnection.migrate.latest();
  return each(tables, (table) => sqlConnection.table(table).truncate());
}
