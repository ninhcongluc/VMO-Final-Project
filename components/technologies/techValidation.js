const Joi = require('joi-plus');

const TechSchema = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  status: Joi.boolean().default(1),
});

module.exports = TechSchema;
