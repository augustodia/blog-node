import type { Knex } from "knex";
import dotenv = require("dotenv");
import path from "path";
import { normalizeOutput } from "./@helpers/normalizeOutput";
dotenv.config({ path: path.resolve(__dirname, "..", "..", "..", ".env") });

function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter, index) =>
    index === 0 ? letter.toLowerCase() : `_${letter.toLowerCase()}`
  );
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER as string,
      password: process.env.DATABASE_PASSWORD as string,
      database: process.env.DATABASE_NAME as string,
    },
    wrapIdentifier: (value, origImpl) => origImpl(camelToSnakeCase(value)),
    postProcessResponse: (result) => {
      if (Array.isArray(result) && typeof result[0] !== "object") {
        return result;
      }

      if (typeof result !== "object") {
        return result;
      }

      return normalizeOutput(result);
    },
    migrations: {
      directory: "./migrations",
      loadExtensions: [".js", ".ts"],
    },
  },
};

export default config;
