import { Knex } from "knex";
import DatabaseConnection from "@infra/database/databaseConnection";

export default class BaseRepository {
  protected connection: Knex;

  constructor() {
    this.connection = DatabaseConnection;
  }
}
