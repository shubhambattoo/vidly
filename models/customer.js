const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 10
  }
})

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(5).required().trim(),
    phone: Joi.string().required().min(6).max(10),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema)
}

module.exports = {
  Customer,
  validateCustomer
}