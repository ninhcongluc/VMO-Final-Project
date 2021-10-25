const { StatusCodes } = require('http-status-codes');

const projectValidation = require('./projectValidation');
const projectService = require('./projectService');

const createProject = async (req, res, next) => {
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
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }

  const isDuplicate = await projectService.findProjectByName(name);
  // check user existed
  if (isDuplicate) {
    console.log('here');
    const error = new Error(`Project with ${name} has already been created`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
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
    return res.status(StatusCodes.OK).send(project);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error.message);
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

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await projectService.deleteProjectById(id);
    res.status(StatusCodes.OK).send('Deleted Successfully');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
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
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }

  try {
    await projectService.updateById(
      id,
      name,
      description,
      typeId,
      statusId,
      startDate,
      endDate,
      unitId,
      customerId
    );
    return res.status(StatusCodes.OK).send('Updated Successfully');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
module.exports = {
  createProject,
  getAll,
  getProjectById,
  deleteProject,
  updateProject,
};
