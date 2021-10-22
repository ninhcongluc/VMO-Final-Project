const { DataTypes } = require('sequelize');

const db = require('../../configs/db');
const Tech = require('../techs/tech');
const projectTech = require('../projects_techs/projectTech');
const Type = require('../project_type/type');
const Status = require('../project_status/status');
const User = require('../users/user');
const Task = require('../tasks/task');
const Unit = require('../units/unit');

const Project = db.define(
  'projects',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    statusId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    unitId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Project.belongsToMany(Tech, { through: projectTech });
Project.belongsTo(Type, { foreignKey: 'typeId' });
Project.belongsTo(Status, { foreignKey: 'statusId' });
Project.belongsTo(User, { foreignKey: 'customerId' });
Project.belongsTo(Unit, { foreignKey: 'unitId' });
Project.hasMany(Task, { foreignKey: 'projectId' });

module.exports = Project;
