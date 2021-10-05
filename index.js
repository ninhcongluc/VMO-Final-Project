const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { StatusCodes } = require('http-status-codes');
// Import config
const swaggerOptions = require('./configs/swagger');
const dbConnect = require('./configs/db');

// Import routes

// Import error handlers
const { errorHandler } = require('./helpers/errorHandler');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
// connect db
dbConnect
  .authenticate()
  .then(() => console.log('Database connected .....'))
  .catch(err => console.log(`Error: ${err}`));

// USE MIDDLEWARE
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ROUTE NOT FOUND
app.use('*', (req, res, next) => {
  const err = new Error('The route can not be found');
  err.statusCode = StatusCodes.NOT_FOUND;
  next(err);
});

// HANDLE ERROR MIDDLEWARE
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`App is listening on ${port}`)
);

module.exports = server;
