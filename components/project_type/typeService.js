const Type = require('./type');

const createType = (name, status) => Type.create({ name, status });

const findAll = () => Type.findAll();

const findTypeById = id => Type.findByPk(id);

const findTypeByName = name => Type.findOne({ where: { name } });

const updateById = (id, name, status) =>
  Type.update({ name, status }, { where: { id } });

const deleteTypeById = id => Type.destroy({ where: { id } });
module.exports = {
  createType,
  findAll,
  findTypeById,
  findTypeByName,
  updateById,
  deleteTypeById,
};
