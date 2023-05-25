import { Knex } from 'knex';

const tables = ['bookings', 'ubers'] as const;

export async function resetDB(sqlConnection: Knex) {
  await sqlConnection.migrate.latest();
  await Promise.all(
    tables.map((table) => sqlConnection.schema.dropTableIfExists(table)),
  );
}
