const Status = require('./status');

const createStatus = (name, status) => Status.create({ name, status });

const findAll = () => Status.findAll();

const findStatusById = id => Status.findByPk(id);

const findStatusByName = name => Status.findOne({ where: { name } });

const updateById = (id, name, status) =>
  Status.update({ name, status }, { where: { id } });

const deleteStatusById = id => Status.destroy({ where: { id } });
module.exports = {
  createStatus,
  findAll,
  findStatusByName,
  findStatusById,
  updateById,
  deleteStatusById,
};
