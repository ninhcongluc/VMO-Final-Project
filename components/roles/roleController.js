const { StatusCodes } = require('http-status-codes');

const roleService = require('./roleService');
const roleValidation = require('./roleValidation');

const createRole = async (req, res, next) => {
  const { name } = req.body;
  const isValid = roleValidation.validate({ name });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  const isDuplicate = await roleService.findRoleByName(name);
  if (isDuplicate) {
    const error = new Error(`${name} is existed`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    const role = await roleService.createRole(name);
    return res.status(StatusCodes.OK).send(role);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const roles = await roleService.findAll();
    res.status(StatusCodes.OK).send(roles);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await roleService.findById(id);
    res.status(StatusCodes.OK).send(role);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const isValid = await roleValidation.validate({ name });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }

  try {
    await roleService.updateById(id, name);
    return res.status(StatusCodes.OK).send('Updated Successfully');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    await roleService.deleteRoleById(id);
    res.status(StatusCodes.OK).send('Deleted Successfully');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = { createRole, getAll, getRoleById, updateRole, deleteRole };
