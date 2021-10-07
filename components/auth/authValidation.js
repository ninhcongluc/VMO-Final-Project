const Joi = require('joi-plus');

const changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .password({
      min: 8,
      max: 120,
      lowercase: true,
      uppercase: true,
      number: true,
      special: true,
      count: 3,
    })
    .required(),

  confirmPassword: Joi.string().match('newPassword').required(),
});

module.exports = { changePasswordSchema };
