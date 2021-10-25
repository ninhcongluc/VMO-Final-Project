const userTask = require('./userTask');

const addTaskToUser = (userId, taskId) => userTask.create({ userId, taskId });
const findAll = () => userTask.findAll();

module.exports = { addTaskToUser, findAll };
