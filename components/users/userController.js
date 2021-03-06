const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');

const userSchema = require('./userValidation');
const userService = require('./userService');
const transporter = require('../../helpers/email');

const saltRounds = 10;

const create = async (req, res, next) => {
  const {
    username,
    password,
    confirmPassword,
    status,
    name,
    dob,
    address,
    cmt,
    phone,
    experience,
    language,
    certificate,
    unitId,
  } = req.body;
  const isValidUser = await userSchema.userSchema.validate({
    username,
    password,
    confirmPassword,
    status,
    name,
    dob,
    address,
    cmt,
    phone,
    experience,
    language,
    certificate,
    unitId,
  });
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
  const isPhoneDuplicate = await userService.findUserByPhone(phone);
  // check phone existed
  if (isPhoneDuplicate) {
    const error = new Error(`Phone number already in use`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  // hash Password
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const createUser = await userService.createUser(
      username,
      hash,
      status,
      name,
      dob,
      address,
      cmt,
      phone,
      experience,
      language,
      certificate,
      unitId
    );
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

const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    status,
    name,
    dob,
    address,
    cmt,
    phone,
    experience,
    language,
    certificate,
    unitId,
  } = req.body;
  const isValid = await userSchema.updateSchema.validate({
    status,
    name,
    dob,
    address,
    cmt,
    phone,
    experience,
    language,
    certificate,
    unitId,
  });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  try {
    await userService.updateById(
      id,
      status,
      name,
      dob,
      address,
      cmt,
      phone,
      experience,
      language,
      certificate,
      unitId
    );
    return res.status(StatusCodes.OK).send('Updated Successfully');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
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

module.exports = {
  create,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
