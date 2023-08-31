import app from './app'
const {SERVER_PORT} = process.env;

app.listen(SERVER_PORT)

console.debug(`🟢 Server is running http://localhost:${SERVER_PORT}`)