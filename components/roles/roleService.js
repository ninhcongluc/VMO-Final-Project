const Role = require('./role');

const findById = rid =>
  Role.findOne({
    where: { id: rid },
  });

const createRole = name => Role.create({ name });

const findAll = () => Role.findAll();
module.exports = { findById, createRole, findAll };
