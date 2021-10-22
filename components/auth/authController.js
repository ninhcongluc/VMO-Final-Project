const jwt = require('jsonwebtoken');
const ls = require('local-storage');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');

const userService = require('../users/userService');
const transporter = require('../../helpers/email');
const authValid = require('./authValidation');

const saltRounds = 10;

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await userService.findUserByUsername(username);
  // check user exist on database
  if (!user) {
    const err = new Error(`Username not found`);
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }

  // compare password
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    const err = new Error(`Incorrect Password`);
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // create token
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
      roles: user.roles,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '2h',
    }
  );
  ls.set('token', token);
  return res.status(StatusCodes.OK).send(token);
};

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await userService.findUserByUsername(email);
  if (!user) {
    const error = new Error('That email address is either invalid, try again.');
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
      roles: user.roles,
      unit: user.unit,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '2h',
    }
  );
  try {
    // send mail
    const options = {
      from: `${process.env.USER}`,
      to: ` ${user.username}`,
      subject: '[VMO] Please reset your password',
      html: `<h1 style="background-color:lightblue;">Reset your GitHub password</h1>
      <br/></br><p style="">We heard that you lost your password. Sorry about that!</p>
      <br/><p style="">But don’t worry! You can use the following link to reset your password:</p>
      <br/><a>http://localhost:8081/password_reset/${token}</a>
      <br/><p>Link expires after 2 hours</p>
      <br/>Thanks,
      The VMO Team
      `,
    };
    await transporter.sendMail(options);
    return res.status(StatusCodes.OK).send(token);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const changePassword = async (req, res, next) => {
  const { id, newPassword, confirmPassword } = req.body;
  if (!id) {
    const error = new Error('Invalid User');
    error.status = StatusCodes.BAD_REQUEST;
    return next(error);
  }

  // check valid password
  const isValidPass = await authValid.changePasswordSchema.validate({
    newPassword,
    confirmPassword,
  });

  if (isValidPass.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValidPass.error.message);
  }

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(newPassword, salt);
    await userService.updateUserById(id, hash);
    return res.status(StatusCodes.OK).send('Password has been change');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = { login, verifyEmail, changePassword };
