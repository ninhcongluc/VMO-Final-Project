const { StatusCodes } = require('http-status-codes');

const userService = require('../users/userService');
const roleService = require('../roles/roleService');
const userRoleService = require('./userRoleService');

const add = async (req, res) => {
  const { userId, roleId } = req.body;
  try {
    const user = await userService.findById(userId);
    const role = await roleService.findById(roleId);
    const userRole = await userRoleService.addRoleToUser(user.id, role.id);
    res.status(StatusCodes.OK).send(userRole);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const userRoles = await userRoleService.findAll();
    res.status(StatusCodes.OK).send(userRoles);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteUserRole = async (req, res) => {
  const { userId } = req.params;
  try {
    await userRoleService.deleteById(userId);
    res.status(StatusCodes.OK).send('Deleted Successfully');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
module.exports = { add, getAll, deleteUserRole };
