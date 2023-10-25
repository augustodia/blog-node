import { Knex } from "knex";
import { UUID_IS_VALID } from "./utils/checks";

const tableName: string = "post";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table
      .uuid("id")
      .primary()
      .notNullable()
      .checkRegex(UUID_IS_VALID, `${tableName}_uuid_valid`)
      .defaultTo(knex.fn.uuid());
    table.uuid("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("user");
    table.string("title").notNullable();
    table.boolean("active").notNullable().defaultTo(true);
    table.boolean("published").notNullable().defaultTo(false);
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
