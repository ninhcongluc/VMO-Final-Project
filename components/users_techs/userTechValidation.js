const Joi = require('joi-plus');

const userTechSchema = Joi.object().keys({
  userId: Joi.string().min(4).max(50).required(),
  techId: Joi.string().min(4).max(50).required(),
});

module.exports = userTechSchema;
