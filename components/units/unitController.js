const { StatusCodes } = require('http-status-codes');

const unitValidation = require('./unitValidation');
const unitService = require('./unitService');

const createUnit = async (req, res) => {
  const { name, description } = req.body;
  const isValid = await unitValidation.validate({
    name,
    description,
  });
  if (isValid.error) {
    res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  try {
    const unit = await unitService.createUnit(name, description);
    res.status(StatusCodes.OK).send(unit);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const units = await unitService.findAll();
    res.status(StatusCodes.OK).send(units);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

module.exports = {
  createUnit,
  getAll,
};
