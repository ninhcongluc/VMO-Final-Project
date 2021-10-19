const ls = require('local-storage');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const authMiddleware = async (req, res, next) => {
  const accessToken = req.headers['x-access-token'] || ls.get('token');
  if (!accessToken) {
    const error = new Error('NOT FOUND TOKEN');
    error.statusCode = StatusCodes.UNAUTHORIZED;
    return next(error);
  }
  try {
    const user = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = user;

    return next();
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: error.message });
  }
};

const authAdminMiddleware = async (req, res, next) => {
  const accessToken = req.headers['x-access-token'] || ls.get('token');

  if (!accessToken) {
    const error = new Error('NOT FOUND TOKEN');
    error.statusCode = StatusCodes.UNAUTHORIZED;
    return next(error);
  }
  try {
    const user = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = user;
    console.log(user);
    const isAdmin = user.roles.some(role => role.name === 'admin');
    if (!isAdmin) {
      const error = new Error(
        'Your account does not have access to this resource'
      );
      error.statusCode = StatusCodes.FORBIDDEN;
      return next(error);
    }
    return next();
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: error.message });
  }
};

module.exports = { authMiddleware, authAdminMiddleware };
