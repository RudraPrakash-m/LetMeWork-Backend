const Joi = require("joi");

const user_registerValidation = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().min(18).required(),
  passion: Joi.string().required()
});

const retireduser_registerValidation = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().strict().min(45).required(),
  domain: Joi.string().required(),
  isVerified: Joi.boolean().default(false),
});

module.exports = { user_registerValidation, retireduser_registerValidation };
