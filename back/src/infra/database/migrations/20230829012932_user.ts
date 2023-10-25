import { Knex } from "knex";
import {
  EMAIL_IS_VALID,
  USER_NAME_IS_VALID,
  UUID_IS_VALID,
} from "./utils/checks";
const tableName: string = "user";

export function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table
      .uuid("id")
      .primary()
      .notNullable()
      .checkRegex(UUID_IS_VALID, `${tableName}_uuid_valid`)
      .defaultTo(knex.fn.uuid());
    table
      .string("user_name")
      .notNullable()
      .unique()
      .checkRegex(USER_NAME_IS_VALID, `${tableName}_user_name_valid`);
    table
      .string("email")
      .notNullable()
      .unique()
      .checkRegex(EMAIL_IS_VALID, `${tableName}_valid_email`);
    table.text("password").notNullable();
    table.boolean("active").notNullable().defaultTo(true);
    table.datetime("created_at").notNullable().defaultTo(knex.fn.now());
    table.datetime("updated_at");
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
