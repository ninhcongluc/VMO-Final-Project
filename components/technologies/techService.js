const Tech = require('./tech');

const createTech = (name, status) => Tech.create({ name, status });

const findAll = () => Tech.findAll();

const count = () => Tech.count();

const findTechByName = name => Tech.findOne({ where: { name } });
module.exports = {
  createTech,
  findAll,
  findTechByName,
  count,
};
