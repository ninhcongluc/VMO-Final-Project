const Task = require('./task');

const findAll = () => Task.findAll();

const findById = id => Task.findByPk(id);

const createTask = (name, description, projectId, startDate, endDate) =>
  Task.create({
    name,
    description,
    projectId,
    startDate,
    endDate,
  });

const findTaskByProjectId = id => Task.findAll({ where: { projectId: id } });

const updateById = (id, name, description, projectId, startDate, endDate) =>
  Task.update(
    { name, description, projectId, startDate, endDate },
    { where: { id } }
  );

const deleteById = id => Task.destroy({ where: { id } });
module.exports = {
  findAll,
  createTask,
  findById,
  findTaskByProjectId,
  updateById,
  deleteById,
};
