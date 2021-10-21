const { DataTypes } = require('sequelize');
const db = require('../../configs/db');

const userTech = db.define(
  'users_techs',
  {
    userId: {
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

module.exports = userTech;
