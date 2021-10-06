const Role = require('./role');

const findById = rid =>
  Role.findOne({
    where: { id: rid },
  });

module.exports = { findById };
