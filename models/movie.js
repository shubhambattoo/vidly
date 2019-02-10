const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    genre : {
        type : genreSchema,
        required : true
    }
})

const Movie = mongoose.model('Movie', movieSchema)

const validateMovie = (movie) => {
    const schema = {
        title: Joi.string().min(2).required().trim().max(50),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        genreId : Joi.objectId().required()
    };

    return Joi.validate(movie, schema)
}

module.exports = {
    Movie,
    validateMovie
}