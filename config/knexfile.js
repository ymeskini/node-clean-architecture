module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      database: "wealuber",
    },
    searchPath: ["dev"],
    pool: {
      min: 2,
      max: 20,
      afterCreate: function (connection, callback) {
        connection.query('SET timezone = "Europe/Paris";', function (err) {
          callback(err, connection);
        });
      },
    },
    migrations: {
      tableName: "knex_migrations",
      schemaName: "dev",
    },
    seeds: {
      directory: __dirname + "/seeds/dev",
    },
  },
  tests: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      database: "wealuber",
    },
    searchPath: ["tests"],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      schemaName: "tests",
      directory: __dirname + "/migrations/",
    },
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 20,
      afterCreate: function (connection, callback) {
        connection.query('SET timezone = "Europe/Paris";', function (err) {
          callback(err, connection);
        });
      },
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: __dirname + "/seeds/dev",
    },
  },
};
