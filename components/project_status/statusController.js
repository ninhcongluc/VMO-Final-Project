const { StatusCodes } = require('http-status-codes');

const statusValid = require('./statusValidation');
const statusService = require('./statusService');

const create = async (req, res, next) => {
  const { name, status } = req.body;
  const isValid = await statusValid.validate({ name, status });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  const isDuplicate = await statusService.findStatusByName(name);
  if (isDuplicate) {
    const error = new Error(`${name} is existed`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    const projectStatus = await statusService.createStatus(name, status);
    return res.status(StatusCodes.OK).send(projectStatus);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const projectStatus = await statusService.findAll();
    res.status(StatusCodes.OK).send(projectStatus);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    const projectStatus = await statusService.findStatusById(id);
    res.status(StatusCodes.OK).send(projectStatus);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const isValid = await statusValid.validate({ name, status });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }

  try {
    await statusService.updateById(id, name, status);
    return res.status(StatusCodes.OK).send('Updated Successfully');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteStatus = async (req, res) => {
  const { id } = req.params;
  try {
    await statusService.deleteStatusById(id);
    res.status(StatusCodes.OK).send('Deleted Successfully');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  create,
  getAll,
  getStatusById,
  updateStatus,
  deleteStatus,
};
