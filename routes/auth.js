const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find().sort({
//       name: 1
//     })
//     res.send(users)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// });

router.post('/', async (req, res) => {

  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');
  // console.log(config.get('jwtPrivateKey'))
  const token = user.generateAuthToken();
  res.send(token)

});

/**
 * Validates the user object sent to API
 * @param user object of the user 
 */
function validate(req) {
  const schema = {
    email: Joi.string().min(3).required().max(255).email(),
    password: Joi.string().min(3).required().max(1024)
  };

  return Joi.validate(req, schema);
}

module.exports = router;