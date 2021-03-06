module.exports =
  process.env.NODE_ENV === 'production'
    ? {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['./**/*.entity.js'],
        migrationsTableName: 'custom_migration_table',
        migrations: ['./migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
      }
    : {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['./**/*.entity{.ts,.js}'],
        migrationsTableName: 'custom_migration_table',
        migrations: ['./migration/*.ts'],
        cli: {
          migrationsDir: 'migration',
        },
      };
