import { Knex } from "knex";
import { UUID_IS_VALID } from "./utils/checks";

const tableName: string = "post_content";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table
      .uuid("id")
      .primary()
      .notNullable()
      .checkRegex(UUID_IS_VALID, `${tableName}_uuid_valid`)
      .defaultTo(knex.fn.uuid());
    table.uuid("post_id").notNullable();
    table.foreign("post_id").references("id").inTable("post");
    table.integer("order").notNullable().defaultTo(1);
    table.text("content").notNullable();
    table.enum("type", ["text"]).notNullable();
    table.boolean("visible").notNullable().defaultTo(true);
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
