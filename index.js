const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

if (!process.env.jwtPrivateKey) {
  console.error('Fatal Error : JWT pvt key not defined');
  process.exit(1)
}

// console.log(process.env.jwtPrivateKey)

mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true
  })
  .then(() => console.log('connected to vidly db...'))
  .catch((err) => console.log('error in connection', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth)

const port = process.env.PORT || 5000;
app.listen(port)
console.log(`Server started on ${port}`)