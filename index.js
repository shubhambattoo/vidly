const genres = require('./routes/genres')
const express = require('express')
const app = express()

app.use(express.json());

app.use('/api/genres', genres)

const port = process.env.PORT || 5000;
app.listen(port)
console.log(`Server started on ${port}`)