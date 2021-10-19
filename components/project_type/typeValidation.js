const Joi = require('joi-plus');

const TypeSchema = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  status: Joi.boolean().default(1),
});

module.exports = TypeSchema;
