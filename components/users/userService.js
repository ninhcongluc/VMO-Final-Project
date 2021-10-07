const User = require('./user');

const findUserByUsername = username => User.findOne({ where: { username } });

const createUser = (username, password, name) =>
  User.create({ username, password, name });

const findAllUsers = () => User.findAll();

const findById = uid =>
  User.findOne({
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
