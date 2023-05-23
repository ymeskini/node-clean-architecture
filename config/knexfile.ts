import { Knex } from 'knex';

type Env = 'development';

const knexConfig: Record<Env, Knex.Config> = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 32768,
      database: 'wealuber',
      user: 'postgres',
      password: 'postgrespw',
    },
    migrations: {
      directory: __dirname + '/migrations/',
    },
    seeds: {
      directory: __dirname + '/seeds/',
    },
  },
};

export default knexConfig;
