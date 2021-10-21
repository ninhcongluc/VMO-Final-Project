const Role = require('./role');

const findById = rid =>
  Role.findOne({
    where: { id: rid },
  });

const createRole = name => Role.create({ name });

const findAll = () => Role.findAll();

const findRoleByName = name => Role.findOne({ where: { name } });

const updateById = (id, name) => Role.update({ name }, { where: { id } });

const deleteRoleById = id => Role.destroy({ where: { id } });
module.exports = {
  findById,
  createRole,
  findAll,
  findRoleByName,
  updateById,
  deleteRoleById,
};
