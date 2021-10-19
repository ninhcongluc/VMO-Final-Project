const { StatusCodes } = require('http-status-codes');

const unitValidation = require('./unitValidation');
const unitService = require('./unitService');
const userService = require('../users/userService');

const createUnit = async (req, res) => {
  const { name, description, managerId } = req.body;
  const isValid = await unitValidation.validate({
    name,
    description,
    managerId,
  });
  if (isValid.error) {
    res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  try {
    const unit = await unitService.createUnit(name, description, managerId);
    res.status(StatusCodes.OK).send(unit);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
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

const updateUnit = async (req, res) => {
  const { id } = req.params;
  const { name, description, managerId } = req.body;
  const isValid = await unitValidation.validate({
    name,
    description,
    managerId,
  });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  try {
    await unitService.updateById(id, name, description, managerId);
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

module.exports = {
  createUnit,
  getAll,
  getUserByUnit,
  updateUnit,
  deleteUnit,
};
