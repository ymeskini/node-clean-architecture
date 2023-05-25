import { Knex } from 'knex';

type Env = 'development' | 'tests';

const knexConfig: Record<Env, Knex.Config> = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'postgres',
      port: 5432,
      database: 'wealuber',
      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/migrations/',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: __dirname + '/seeds/',
    },
  },
  tests: {
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'wealuber',
      user: 'postgres',
      password: 'postgres',
    },
  },
};

export default knexConfig;
