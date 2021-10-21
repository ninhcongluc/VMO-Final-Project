const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { StatusCodes } = require('http-status-codes');
// Import config
const swaggerOptions = require('./configs/swagger');
const dbConnect = require('./configs/db');

// Import routes
const authRoutes = require('./components/auth/authAPI');
const roleRoutes = require('./components/roles/roleAPI');
const userRoleRoutes = require('./components/users_roles/userRoleAPI');
const userRoutes = require('./components/users/userAPI');
const techRoutes = require('./components/techs/techAPI');
const projectRoutes = require('./components/projects/projectAPI');
const unitRoutes = require('./components/units/unitAPI');
const projectStatusRoutes = require('./components/project_status/statusAPI');
const projectTypeRoutes = require('./components/project_type/typeAPI');
const projectTechRoutes = require('./components/projects_techs/projectTechAPI');
const taskRoutes = require('./components/tasks/taskAPI');
const userTaskRoutes = require('./components/users_tasks/userTaskAPI');
const userTechRoutes = require('./components/users_techs/userTechAPI');

// Import error handlers
const { errorHandler } = require('./helpers/errorHandler');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
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
app.use(authRoutes);
app.use(roleRoutes);
app.use(userRoutes);
app.use(userRoleRoutes);
app.use(techRoutes);
app.use(projectTypeRoutes);
app.use(projectRoutes);
app.use(projectStatusRoutes);
app.use(projectTechRoutes);
app.use(unitRoutes);
app.use(taskRoutes);
app.use(userTaskRoutes);
app.use(userTechRoutes);
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
