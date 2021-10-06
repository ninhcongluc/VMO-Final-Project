exports.errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send(error.message);
  next();
};
