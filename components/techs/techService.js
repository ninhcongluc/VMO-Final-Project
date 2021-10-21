const Tech = require('./tech');

const createTech = (name, status) => Tech.create({ name, status });

const findAll = () => Tech.findAll();

const count = () => Tech.count();

const findTechById = id => Tech.findByPk(id);

const findTechByName = name => Tech.findOne({ where: { name } });

const updateById = (id, name, status) =>
  Tech.update({ name, status }, { where: { id } });

const deleteTechById = id => Tech.destroy({ where: { id } });
module.exports = {
  createTech,
  findAll,
  findTechByName,
  count,
  findTechById,
  updateById,
  deleteTechById,
};
