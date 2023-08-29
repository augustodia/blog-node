import knex from "knex";

knex({
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
        loadExtensions: ['.ts']
    }
})
