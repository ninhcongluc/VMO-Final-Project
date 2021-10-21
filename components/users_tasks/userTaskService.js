const userTask = require('./userTask');

const addTaskToUser = (userId, taskId) => userTask.create({ userId, taskId });

module.exports = { addTaskToUser };
