const Unit = require('./unit');

const createUnit = (name, description) =>
  Unit.create({
    name,
    description,
  });

const findAll = () => Unit.findAll();
module.exports = {
  createUnit,
  findAll,
};
