const User = require('./user');

const findUserByUsername = username => User.findOne({ where: { username } });

const createUser = (username, password, name) =>
  User.create({ username, password, name });

const findAllUsers = () => User.findAll();

const findById = uid =>
  User.findOne({
    where: { id: uid },
  });

module.exports = { findUserByUsername, createUser, findAllUsers, findById };
