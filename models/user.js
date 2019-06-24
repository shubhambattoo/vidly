const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin : {
    type : Boolean
  }
})

/**
 * @description Create JWT tokens for user
 */
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({
    _id: user._id,
    isAdmin : this.isAdmin
  }, process.env.jwtPrivateKey)
  return token;
}

const User = mongoose.model('User', userSchema);

/**
 * Validates the user object sent to API
 * @param user object of the user 
 */
function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required().max(50),
    email: Joi.string().min(3).required().max(255).email(),
    password: Joi.string().min(3).required().max(1024)
  };

  return Joi.validate(user, schema);
}

module.exports = {
  User,
  validate: validateUser
}