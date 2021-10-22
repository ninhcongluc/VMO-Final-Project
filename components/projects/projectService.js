const Project = require('./project');
const Type = require('../project_type/type');
const Status = require('../project_status/status');
const User = require('../users/user');
const Tech = require('../techs/tech');
const Unit = require('../units/unit');

const createProject = (
  name,
  description,
  typeId,
  statusId,
  startDate,
  endDate,
  unitId,
  customerId
) =>
  Project.create({
    name,
    description,
    typeId,
    statusId,
    startDate,
    endDate,
    unitId,
    customerId,
  });

const findAll = () =>
  Project.findAll({
    include: [Type, Status, User, Tech, Unit],
  });

const findById = id => Project.findByPk(id);
module.exports = {
  createProject,
  findAll,
  findById,
};
