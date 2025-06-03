import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL', 'postgresql://teromix_user:k85ZVCKaZynyleZMczpmH2FrZP0POCCT@dpg-d0vlpegdl3ps73frb3gg-a.oregon-postgres.render.com/teromix_wvds'),
        host: env('DATABASE_HOST', 'dpg-d0vlpegdl3ps73frb3gg-a.oregon-postgres.render.com'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'teromix_wvds'),
        user: env('DATABASE_USERNAME', 'teromix_user'),
        password: env('DATABASE_PASSWORD', 'k85ZVCKaZynyleZMczpmH2FrZP0POCCT'),
        ssl: {
          rejectUnauthorized: false
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
