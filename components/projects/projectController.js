const { StatusCodes } = require('http-status-codes');

const projectValidation = require('./projectValidation');
const projectService = require('./projectService');

const createProject = async (req, res) => {
  const {
    name,
    description,
    typeId,
    statusId,
    startDate,
    endDate,
    unitId,
    customerId,
  } = req.body;
  const isValid = await projectValidation.validate({
    name,
    description,
    typeId,
    statusId,
    startDate,
    endDate,
    unitId,
    customerId,
  });
  if (isValid.error) {
    res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  try {
    const project = await projectService.createProject(
      name,
      description,
      typeId,
      statusId,
      startDate,
      endDate,
      unitId,
      customerId
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

const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await projectService.findById(id);
    res.status(StatusCodes.OK).send(project);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  createProject,
  getAll,
  getProjectById,
};
