const User = require('./user');
const Role = require('../roles/role');
const Unit = require('../units/unit');

const findUserByUsername = username => User.findOne({ where: { username } });

const createUser = (username, password, name) =>
  User.create({ username, password, name });

const findAllUsers = () =>
  User.findAll({
    include: [Role, Unit],
  });

const findById = uid =>
  User.findOne({
    include: [Role, Unit],
    where: { id: uid },
  });

const updateUserById = (id, newPassword) =>
  User.update({ password: newPassword }, { where: { id } });

module.exports = {
  findUserByUsername,
  createUser,
  findAllUsers,
  findById,
  updateUserById,
};
