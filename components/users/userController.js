const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');

const userSchema = require('./userValidation');
const userService = require('./userService');
const transporter = require('../../helpers/email');

const saltRounds = 10;

const create = async (req, res, next) => {
  const { username, password, name } = req.body;
  const isValidUser = await userSchema.validate({ username, password, name });
  // check valid data
  if (isValidUser.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValidUser.error.message);
  }
  const user = await userService.findUserByUsername(username);
  // check user existed
  if (user) {
    const error = new Error(`User with ${username} has already been created`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  // hash Password
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const createUser = await userService.createUser(username, hash, name);
    // send mail
    const options = {
      from: `${process.env.USER}`,
      to: `ninhconglucit@gmail.com, ${createUser.username}`,
      subject: 'Send an account to access the project system',
      html: `<b style="background-color:lightblue;">The system will send you an account and password for you to log into the company's project management system:</b>
      </br></br><b style="color:red;">username:</b> ${createUser.username}
      </br><b style="color:red;">password:</b> ${password}
      </br></br><b>Best regards,</b>`,
    };
    await transporter.sendMail(options);
    return res.send(`User ${username}  created successfully`);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.status(StatusCodes.OK).send(users);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.findById(id);
    res.status(StatusCodes.OK).send(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.deleteUserById(id);
    res.status(StatusCodes.OK).send('Deleted Successfully');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getUserByRole = async (req, res) => {
  const { role } = req.body;
  try {
    const users = await userService.getUserByRole(role);
    res.status(StatusCodes.OK).send(users);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
module.exports = {
  create,
  getAllUsers,
  getUserById,
  deleteUser,
  getUserByRole,
};
