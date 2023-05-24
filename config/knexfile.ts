import { Knex } from 'knex';

type Env = 'development';

const knexConfig: Record<Env, Knex.Config> = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'postgres',
      port: 5432,
      database: 'wealuber',
      user: 'admin',
      password: 'admin',
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
