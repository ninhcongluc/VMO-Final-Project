const Joi = require('joi-plus');

const projectSchema = Joi.object().keys({
  name: Joi.string().min(4).max(50).required(),
  description: Joi.string(10).max(200).required(),
  typeId: Joi.string().min(4).max(20),
  statusId: Joi.string().min(4).max(20),
  technologies: Joi.array().items(Joi.string()),
  startDate: Joi.date(),
  endDate: Joi.date(),
  unitId: Joi.string().min(4).max(20),
  customerId: Joi.string().min(4).max(20),
});

module.exports = projectSchema;
