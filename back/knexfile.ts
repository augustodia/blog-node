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

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
