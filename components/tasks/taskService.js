const Task = require('./task');
const User = require('../users/user');

const findAll = () => Task.findAll({ include: [Task, User] });

const findById = id => Task.findByPk(id);

const createTask = (name, description, projectId, startDate, endDate) =>
  Task.create({
    name,
    description,
    projectId,
    startDate,
    endDate,
  });

module.exports = {
  findAll,
  createTask,
  findById,
};
