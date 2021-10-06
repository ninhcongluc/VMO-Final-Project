const jwt = require('jsonwebtoken');
const ls = require('local-storage');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');

const userService = require('../users/userService');

// const saltRounds = 10;

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
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '2h',
    }
  );
  ls.set('token', token);
  return res.status(StatusCodes.OK).send(token);
};

module.exports = { login };
