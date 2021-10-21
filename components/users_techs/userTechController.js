const { StatusCodes } = require('http-status-codes');

const userTechService = require('./userTechService');
const userService = require('../users/userService');
const techService = require('../techs/techService');

const createUserTech = async (req, res) => {
  const { userId, techId } = req.body;
  try {
    const user = await userService.findById(userId);
    const tech = await techService.findTechById(techId);
    const userTech = await userTechService.addTechToUser(user.id, tech.id);
    res.status(StatusCodes.OK).send(userTech);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

module.exports = { createUserTech };
