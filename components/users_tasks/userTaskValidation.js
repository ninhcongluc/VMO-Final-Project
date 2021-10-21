const Joi = require('joi-plus');

const userTaskSchema = Joi.object().keys({
  userId: Joi.string().min(4).max(50).required(),
  taskId: Joi.string().min(4).max(50).required(),
});

module.exports = userTaskSchema;
