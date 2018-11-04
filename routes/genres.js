const Joi = require('joi');
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name : {
    type : String,
    trim : true,
    required : true,
    minlength : 3,
    maxlength : 50
  }
})

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name : 1 })
    res.send(genres)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/', async (req, res) => {

  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({ name: req.body.name })
  genre = await genre.save()

  res.send(genre)
})

router.put('/:id', async (req, res) => {

  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name : req.body.name}, {new : true, useFindAndModify : false})

  if (!genre) return res.status(404).send('No genre with ' + req.param.id + ' was found')

  res.send(genre)
})

router.delete('/:id', async (req, res) => {

  const genre = await Genre.findByIdAndRemove(req.params.id)

  if (!genre) return res.status(404).send('No genre with ' + req.params.id + ' was found')

  res.send(genre)
})

router.get('/:id', async (req, res) => {

  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('No genre with ' + req.params.id + ' was found')

  res.send(genre)

})

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema)
}

module.exports = router;