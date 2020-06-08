const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
  let schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).required(),
    locations: Joi.array(),
  };
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  let schema = {
    name: Joi.string().min(3),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

const simpleValidation = (data) => {
  let schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.simpleValidation = simpleValidation;
