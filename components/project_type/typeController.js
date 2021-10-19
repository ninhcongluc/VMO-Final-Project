const { StatusCodes } = require('http-status-codes');

const typeValid = require('./typeValidation');
const typeService = require('./typeService');

const create = async (req, res, next) => {
  const { name, status } = req.body;
  const isValid = await typeValid.validate({ name, status });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  const isDuplicate = await typeService.findTypeByName(name);
  if (isDuplicate) {
    const error = new Error(`${name} is existed`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    const projectType = await typeService.createType(name, status);
    return res.status(StatusCodes.OK).send(projectType);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const projectTypes = await typeService.findAll();
    res.status(StatusCodes.OK).send(projectTypes);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const projectType = await typeService.findTypeById(id);
    res.status(StatusCodes.OK).send(projectType);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const updateType = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const isValid = await typeValid.validate({ name, status });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }

  try {
    await typeService.updateById(id, name, status);
    return res.status(StatusCodes.OK).send('Updated Successfully');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteType = async (req, res) => {
  const { id } = req.params;
  try {
    await typeService.deleteTypeById(id);
    res.status(StatusCodes.OK).send('Deleted Successfully');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  create,
  getAll,
  getTypeById,
  updateType,
  deleteType,
};
