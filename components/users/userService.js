const User = require('./user');
const Role = require('../roles/role');
const Unit = require('../units/unit');

const findUserByUsername = username =>
  User.findOne({ include: [Role, Unit], where: { username } });

const findUserByUnitId = unitId => User.findAll({ where: { unitId } });

const createUser = (username, password, name) =>
  User.create({ username, password, name });

const findAllUsers = () =>
  User.findAll({
    include: [Role, Unit],
  });

const findUserByRole = role =>
  User.findAll({
    include: [Role],

    where: { role },
  });
const findById = uid =>
  User.findOne({
    include: [Role, Unit],
    where: { id: uid },
  });

const deleteUserById = id => User.destroy({ where: { id } });
const updateUserById = (id, newPassword) =>
  User.update({ password: newPassword }, { where: { id } });

module.exports = {
  findUserByUsername,
  findUserByUnitId,
  createUser,
  findAllUsers,
  findById,
  updateUserById,
  deleteUserById,
  findUserByRole,
};
