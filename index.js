require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
require('dotenv').config();
const error = require('./middlewares/error');
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

winston.add(new winston.transports.File({filename : 'logfile.log'}))
winston.add(new winston.transports.MongoDB({db : 'mongodb://localhost/vidly'}));

if (!process.env.jwtPrivateKey) {
  console.error('Fatal Error : JWT pvt key not defined');
  process.exit(1)
}

console.log(process.env.jwtPrivateKey);
const db = process.env.NODE_ENV === 'test' ? `${process.env.DB_URI}${process.env.DB_test}` : `${process.env.DB_URI}${process.env.DB}`;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(db,  {
  useNewUrlParser: true
  })
  .then(() => console.log('connected to vidly db ...' + process.env.NODE_ENV))
  .catch((err) => console.log('error in connection', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error)

const port = process.env.PORT || 5000;
app.listen(port)
console.log(`Server started on ${port}`)