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

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskService.findById(id);
    res.status(StatusCodes.OK).send(task);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
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

  try {
    await taskService.updateById(
      id,
      name,
      description,
      projectId,
      startDate,
      endDate
    );
    return res.status(StatusCodes.OK).send('Updated Successfully');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await taskService.deleteById(id);
    res.status(StatusCodes.OK).send('Deleted Successfully');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
module.exports = { getAll, createTask, getTaskById, updateTask, deleteTask };
