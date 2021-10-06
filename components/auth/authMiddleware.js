const ls = require('local-storage');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const userRoleService = require('../users_roles/userRoleService');
const roleService = require('../roles/roleService');

const authMiddleware = async (req, res, next) => {
  const accessToken = ls.get('token');
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
  const accessToken = ls.get('token');

  if (!accessToken) {
    const error = new Error('NOT FOUND TOKEN');
    error.statusCode = StatusCodes.UNAUTHORIZED;
    return next(error);
  }
  try {
    const user = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = user;

    const userRole = await userRoleService.findRoleUser(req.user.id);
    const arrRoleId = userRole.map(ur => ur.dataValues.rid);
    const roleNames = [];
    for (let i = 0; i < arrRoleId.length; i += 1) {
      const role = await roleService.findById(arrRoleId[i]);
      roleNames.push(role.name);
    }
    const isAdmin = roleNames.some(name => name === 'admin');

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
