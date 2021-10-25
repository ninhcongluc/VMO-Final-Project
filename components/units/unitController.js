const { StatusCodes } = require('http-status-codes');

const unitValidation = require('./unitValidation');
const unitService = require('./unitService');
const userService = require('../users/userService');
const projectService = require('../projects/projectService');

const createUnit = async (req, res, next) => {
  const { name, description } = req.body;
  const isValid = await unitValidation.validate({
    name,
    description,
  });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  const isDuplicate = await unitService.findUnitByName(name);
  if (isDuplicate) {
    const error = new Error(`Unit ${name} already exists`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    const unit = await unitService.createUnit(name, description);
    return res.status(StatusCodes.OK).send(unit);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const units = await unitService.findAll();
    res.status(StatusCodes.OK).send(units);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getUserByUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await userService.findUserByUnitId(id);
    res.status(StatusCodes.OK).send(users);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
const getProjectByUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await projectService.findProjectByUnitId(id);
    res.status(StatusCodes.OK).send(projects);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const updateUnit = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const isValid = await unitValidation.validate({
    name,
    description,
  });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  const isDuplicate = await unitService.findUnitByName(name);
  if (isDuplicate) {
    const error = new Error(`Unit ${name} already exists`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    await unitService.updateById(id, name, description);
    return res.status(StatusCodes.OK).send('Updated Successfully');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteUnit = async (req, res) => {
  const { id } = req.params;
  try {
    await unitService.deleteUnitById(id);
    res.status(StatusCodes.OK).send('Deleted Successfully');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const unit = await unitService.findUnitById(id);
    res.status(StatusCodes.OK).send(unit);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  createUnit,
  getAll,
  getUserByUnit,
  getProjectByUnit,
  updateUnit,
  deleteUnit,
  getUnitById,
};
