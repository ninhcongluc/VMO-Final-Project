const { StatusCodes } = require('http-status-codes');

const projectService = require('../projects/projectService');
const techService = require('../techs/techService');
const projectTechService = require('./projectTechService');

const add = async (req, res) => {
  const { projectId, techId } = req.body;
  try {
    const project = await projectService.findById(projectId);
    const tech = await techService.findTechById(techId);
    const projectTech = await projectTechService.addTechToProject(
      project.id,
      tech.id
    );
    res.status(StatusCodes.OK).send(projectTech);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const projectTechs = await projectTechService.findAll();
    res.status(StatusCodes.OK).send(projectTechs);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = { add, getAll };
