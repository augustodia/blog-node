import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("user").del();

    await knex("user").insert([
        { id: 1, user_name: "Admin", email: "admin@admin.com", password: "admin" },
    ]);
}