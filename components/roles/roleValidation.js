const Joi = require('joi-plus');

const roleSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
});

module.exports = roleSchema;
