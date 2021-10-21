const { StatusCodes } = require('http-status-codes');

const techValid = require('./techValidation');
const techService = require('./techService');

const create = async (req, res, next) => {
  const { name, status } = req.body;
  const isValid = await techValid.validate({ name, status });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  const isDuplicate = await techService.findTechByName(name);
  if (isDuplicate) {
    const error = new Error(`${name} is existed`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    const tech = await techService.createTech(name, status);
    return res.status(StatusCodes.OK).send(tech);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const techs = await techService.findAll();
    res.status(StatusCodes.OK).send(techs);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getTechById = async (req, res) => {
  const { id } = req.params;
  try {
    const tech = await techService.findTechById(id);
    res.status(StatusCodes.OK).send(tech);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const updateTech = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const isValid = await techValid.validate({ name, status });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }

  try {
    await techService.updateById(id, name, status);
    return res.status(StatusCodes.OK).send('Updated Successfully');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteTech = async (req, res) => {
  const { id } = req.params;
  try {
    await techService.deleteTechById(id);
    res.status(StatusCodes.OK).send('Deleted Successfully');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  create,
  getAll,
  getTechById,
  updateTech,
  deleteTech,
};
