import { Knex } from 'knex';
import { resolve } from 'path';

const tables = ['bookings', 'ubers'] as const;

export const runMigration = async (sqlConnection: Knex) => {
  await sqlConnection.migrate.latest({
    directory: resolve(__dirname, 'migrations'),
  });
};

export async function resetDB(sqlConnection: Knex) {
  await Promise.all(
    tables.map((table) => sqlConnection.schema.dropTableIfExists(table)),
  );
}
