import type { Knex } from "knex";
import dotenv = require('dotenv');

dotenv.config({
  path: '../../../.env'
})

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
      directory: './migrations',
      loadExtensions: ['.js','.ts']
    }
  },
};

export default config;
