const Joi = require('joi-plus');

const userSchema = Joi.object().keys({
  username: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'vn'] },
  }),
  password: Joi.string()
    .password({
      min: 6,
      max: 200,
      lowercase: true,
      uppercase: true,
      number: true,
      // count: 4, // 4 props true => pass
    })
    .required(),
  confirmPassword: Joi.string().match('password').required(),
  status: Joi.boolean().default(0),
  name: Joi.string().min(3).max(30).required(),
  dob: Joi.date(),
  address: Joi.string().max(100),
  cmt: Joi.string().min(10).max(15),
  phone: Joi.string().min(8).max(15),
  technical: Joi.string().max(100),
  experience: Joi.number().integer().min(0).max(100).default(0),
  language: Joi.string().max(100),
  certificate: Joi.string().max(100),
  unitId: Joi.string().min(5).max(100),
});

const updateSchema = Joi.object().keys({
  status: Joi.boolean().default(0),
  name: Joi.string().min(3).max(30).required(),
  dob: Joi.date(),
  address: Joi.string().max(100),
  cmt: Joi.string().min(10).max(15),
  phone: Joi.string().min(8).max(15),
  technical: Joi.string().max(100),
  experience: Joi.number().integer().min(0).max(100).default(0),
  language: Joi.string().max(100),
  certificate: Joi.string().max(100),
  unitId: Joi.string().min(5).max(100),
});

module.exports = { userSchema, updateSchema };
