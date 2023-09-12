import knex from "knex";
import { config } from "dotenv";
import knexConfig from "./knexfile";

config();
const DatabaseConnection = knex(knexConfig.development);

export default DatabaseConnection;
