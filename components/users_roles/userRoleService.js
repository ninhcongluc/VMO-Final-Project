const userRole = require('./userRole');

const addRoleToUser = (userId, roleId) => userRole.create({ userId, roleId });

const findRoleUser = userId =>
  userRole.findAll({
    where: { uid: userId },
  });

const findAll = () => userRole.findAll();

const deleteById = id => userRole.destroy({ where: { userId: id } });
module.exports = { addRoleToUser, findRoleUser, findAll, deleteById };
