import * as knex from "knex";

const BlueBirdPromise = require('bluebird');

const tables = [
    'bookings',
    'ubers',
];

export function resetDB(sqlConnection: knex) {
    return sqlConnection.migrate.latest().then(() => {
        return BlueBirdPromise.each(tables, function (table) {
            return sqlConnection.raw('truncate table ' + table + ' cascade');
        });
    });
}