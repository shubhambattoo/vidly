const auth = require('../middlewares/auth');
const {Genre, validateGenre} = require('../models/genre');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const isAdmin = require('../middlewares/admin')

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name : 1 })
    res.send(genres)
  } catch (error) {
    res.status(400).send(error)
  }
});

router.post('/', auth, async (req, res) => {

  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({ name: req.body.name })
  genre = await genre.save()

  res.send(genre)
});

router.put('/:id', async (req, res) => {

  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name : req.body.name}, {new : true, useFindAndModify : false})

  if (!genre) return res.status(404).send('No genre with ' + req.param.id + ' was found')

  res.send(genre)
});

router.delete('/:id', [auth, isAdmin], async (req, res) => {

  const genre = await Genre.findByIdAndRemove(req.params.id)

  if (!genre) return res.status(404).send('No genre with ' + req.params.id + ' was found')

  res.send(genre)
});

router.get('/:id', async (req, res) => {

  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('No genre with ' + req.params.id + ' was found')

  res.send(genre)

});

module.exports = router;