import {Knex} from "knex";
import {IS_EMAIL_REGEX} from "./utils/checks";

const tableName: string = 'user'

export function up(knex: Knex) {
    return knex.schema.createTable(tableName, (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid())
        table.string('name').notNullable()
        table.string('email').notNullable().unique().checkRegex(IS_EMAIL_REGEX, 'isEmail')
        table.text('password').notNullable()
        table.boolean('active').notNullable().defaultTo(true)
        table.datetime('created_at').notNullable().defaultTo(knex.fn.now())
        table.datetime('updated_at')
    })
}

export function down(knex: Knex) {
    return knex.schema.dropTable(tableName)
}
