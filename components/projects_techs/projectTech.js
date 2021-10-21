const { DataTypes } = require('sequelize');
const db = require('../../configs/db');

const projectTech = db.define(
  'projects_techs',
  {
    projectId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    techId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = projectTech;
