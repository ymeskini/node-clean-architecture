import { Knex } from 'knex';
import { each } from 'bluebird';

const tables = ['bookings', 'ubers'];

export async function resetDB(sqlConnection: Knex) {
  return sqlConnection.migrate.latest().then(() => {
    return each(tables, function (table) {
      return sqlConnection.raw('truncate table ' + table + ' cascade');
    });
  });
}
