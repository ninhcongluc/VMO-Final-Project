const Unit = require('./unit');

const createUnit = (name, description, managerId) =>
  Unit.create({
    name,
    description,
    managerId,
  });

const findAll = () => Unit.findAll();

const updateById = (id, name, description, managerId) =>
  Unit.update({ name, description, managerId }, { where: { id } });

const deleteUnitById = id => Unit.destroy({ where: { id } });
module.exports = {
  createUnit,
  findAll,
  updateById,
  deleteUnitById,
};
