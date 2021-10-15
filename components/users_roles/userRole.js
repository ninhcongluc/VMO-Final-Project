const { DataTypes } = require('sequelize');
const db = require('../../configs/db');

const userRole = db.define(
  'users_roles',
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userRole;
