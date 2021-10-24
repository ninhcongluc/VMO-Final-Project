const User = require('./user');
const Role = require('../roles/role');
const Unit = require('../units/unit');

const findUserByUsername = username =>
  User.findOne({ include: [Role, Unit], where: { username } });

const findUserByUnitId = unitId => User.findAll({ where: { unitId } });

const createUser = (
  username,
  password,
  status,
  name,
  dob,
  address,
  cmt,
  phone,
  experience,
  language,
  certificate,
  unitId
) =>
  User.create({
    username,
    password,
    status,
    name,
    dob,
    address,
    cmt,
    phone,
    experience,
    language,
    certificate,
    unitId,
  });

const findAllUsers = () =>
  User.findAll({
    include: [Role, Unit],
  });

const findById = uid =>
  User.findOne({
    include: [Role, Unit],
    where: { id: uid },
  });

const deleteUserById = id => User.destroy({ where: { id } });
const updateUserById = (id, newPassword) =>
  User.update({ password: newPassword }, { where: { id } });

const updateById = (
  id,
  status,
  name,
  dob,
  address,
  cmt,
  phone,
  experience,
  language,
  certificate,
  unitId
) =>
  User.update(
    {
      status,
      name,
      dob,
      address,
      cmt,
      phone,
      experience,
      language,
      certificate,
      unitId,
    },
    { where: { id } }
  );
module.exports = {
  findUserByUsername,
  findUserByUnitId,
  createUser,
  findAllUsers,
  findById,
  updateUserById,
  deleteUserById,
  updateById,
};
