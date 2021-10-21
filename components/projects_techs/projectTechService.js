const projectTech = require('./projectTech');

const addTechToProject = (projectId, techId) =>
  projectTech.create({ projectId, techId });

const findAll = () => projectTech.findAll();
module.exports = { addTechToProject, findAll };
