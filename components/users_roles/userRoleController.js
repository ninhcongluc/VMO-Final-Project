const { StatusCodes } = require('http-status-codes');

const userService = require('../users/userService');
const roleService = require('../roles/roleService');
const userRoleService = require('./userRoleService');

const add = async (req, res) => {
  const { uid, rid } = req.body;
  try {
    const user = await userService.findById(uid);
    const role = await roleService.findById(rid);
    const userRole = await userRoleService.addRoleToUser(user.id, role.id);
    res.status(StatusCodes.OK).send(userRole);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

module.exports = { add };
