const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true
  })
  .then(() => console.log('connected to vidly db...'))
  .catch((err) => console.log('error in connection', err));

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 5000;
app.listen(port)
console.log(`Server started on ${port}`)