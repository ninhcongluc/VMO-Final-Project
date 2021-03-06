const Joi = require('joi-plus');

const unitSchema = Joi.object().keys({
  name: Joi.string().min(4).max(50).required(),
  description: Joi.string().min(10).max(200).required(),
});

module.exports = unitSchema;
