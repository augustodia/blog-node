import express from 'express';
const app = express()

app.listen(4321)
app.get('/', (req, res) => {
    res.send('hello world')
})