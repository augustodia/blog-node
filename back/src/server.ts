import app from './app'
import databaseConnection from "@infra/database/databaseConnection";
const {SERVER_PORT} = process.env;

databaseConnection()

app.listen(SERVER_PORT)

console.debug(`🟢 Server is running http://localhost:${SERVER_PORT}`)