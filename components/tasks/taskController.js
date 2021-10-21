const { StatusCodes } = require('http-status-codes');

const taskService = require('./taskService');
const taskValidation = require('./taskValidation');
const projectService = require('../projects/projectService');

const getAll = async (req, res) => {
  try {
    const tasks = await taskService.findAll();
    res.status(StatusCodes.OK).send(tasks);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const createTask = async (req, res, next) => {
  const { name, description, projectId, startDate, endDate } = req.body;
  const isValid = await taskValidation.validate({
    name,
    description,
    projectId,
    startDate,
    endDate,
  });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  const projects = await projectService.findAll();
  const isProject = projects.some(p => p.id === projectId);
  if (!isProject) {
    const error = new Error('ProjectID not available');
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    const task = await taskService.createTask(
      name,
      description,
      projectId,
      startDate,
      endDate
    );
    return res.status(StatusCodes.OK).send(task);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = { getAll, createTask };
