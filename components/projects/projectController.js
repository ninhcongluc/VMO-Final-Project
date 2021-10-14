const { StatusCodes } = require('http-status-codes');

const projectValidation = require('./projectValidation');
const projectService = require('./projectService');

const createProject = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;
  const isValid = await projectValidation.validate({
    name,
    description,
    startDate,
    endDate,
  });
  if (isValid.error) {
    res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  try {
    const project = await projectService.createProject(
      name,
      description,
      startDate,
      endDate
    );
    res.status(StatusCodes.OK).send(project);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const projects = await projectService.findAll();
    res.status(StatusCodes.OK).send(projects);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

module.exports = {
  createProject,
  getAll,
};
