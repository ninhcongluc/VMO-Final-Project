const Joi = require('joi-plus');

const projectSchema = Joi.object().keys({
  name: Joi.string().min(4).max(50).required(),
  description: Joi.string().min(10).max(200).required(),
  typeId: Joi.string().min(4).max(100),
  statusId: Joi.string().min(4).max(100),
  startDate: Joi.date(),
  endDate: Joi.date(),
  unitId: Joi.string().min(4).max(100),
  customerId: Joi.string().min(4).max(100),
});

module.exports = projectSchema;
