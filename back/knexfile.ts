import type { Knex } from "knex";
import dotenv = require('dotenv');

dotenv.config()


// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host : process.env.DATABASE_HOST,
      port : Number(process.env.DATABASE_PORT),
      user : process.env.DATABASE_USER as string,
      password : process.env.DATABASE_PASSWORD as string,
      database : process.env.DATABASE_NAME as string
    },
    migrations: {
      directory: './src/infra/database/migrations',
      loadExtensions: ['.js','.ts']
    }
  },
};

module.exports = config;
