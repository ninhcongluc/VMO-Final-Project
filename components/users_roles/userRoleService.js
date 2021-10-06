const userRole = require('./userRole');

const addRoleToUser = (userId, roleId) =>
  userRole.create({ uid: userId, rid: roleId });

const findRoleUser = userId =>
  userRole.findAll({
    where: { uid: userId },
  });

module.exports = { addRoleToUser, findRoleUser };
