const Unit = require('./unit');

const createUnit = (name, description) =>
  Unit.create({
    name,
    description,
  });

const findAll = () => Unit.findAll();

const updateById = (id, name, description) =>
  Unit.update({ name, description }, { where: { id } });

const deleteUnitById = id => Unit.destroy({ where: { id } });
module.exports = {
  createUnit,
  findAll,
  updateById,
  deleteUnitById,
};
