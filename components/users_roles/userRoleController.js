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

module.exports = { add };
