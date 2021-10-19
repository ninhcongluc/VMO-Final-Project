const { StatusCodes } = require('http-status-codes');

const roleService = require('./roleService');

const createRole = async (req, res) => {
  const { name } = req.body;
  try {
    const role = await roleService.createRole(name);
    res.status(StatusCodes.OK).send(role);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
  res.send(name);
};

const getAll = async (req, res) => {
  try {
    const roles = await roleService.findAll();
    res.status(StatusCodes.OK).send(roles);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};
module.exports = { createRole, getAll };
