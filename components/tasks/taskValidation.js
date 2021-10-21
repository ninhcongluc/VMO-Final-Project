const Joi = require('joi-plus');

const taskSchema = Joi.object().keys({
  name: Joi.string().min(4).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  projectId: Joi.string().min(4).max(100),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

module.exports = taskSchema;
