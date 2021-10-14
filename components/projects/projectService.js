const Project = require('./project');

const createProject = (name, description, startDate, endDate) =>
  Project.create({
    name,
    description,
    startDate,
    endDate,
  });

const findAll = () => Project.findAll();
module.exports = {
  createProject,
  findAll,
};
