const { StatusCodes } = require('http-status-codes');

const userTaskService = require('./userTaskService');
const userService = require('../users/userService');
const taskService = require('../tasks/taskService');

const createUserTask = async (req, res) => {
  const { userId, taskId } = req.body;
  try {
    const user = await userService.findById(userId);
    const task = await taskService.findById(taskId);
    const userTask = await userTaskService.addTaskToUser(user.id, task.id);
    res.status(StatusCodes.OK).send(userTask);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const userTask = await userTaskService.findAll();
    res.status(StatusCodes.OK).send(userTask);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = { createUserTask, getAll };
