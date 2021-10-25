const Unit = require('./unit');

const createUnit = (name, description) =>
  Unit.create({
    name,
    description,
  });

const findAll = () => Unit.findAll();
const findUnitById = id => Unit.findByPk(id);

const updateById = (id, name, description) =>
  Unit.update({ name, description }, { where: { id } });

const deleteUnitById = id => Unit.destroy({ where: { id } });

const findUnitByName = name => Unit.findOne({ where: { name } });
module.exports = {
  createUnit,
  findAll,
  updateById,
  deleteUnitById,
  findUnitById,
  findUnitByName,
};
