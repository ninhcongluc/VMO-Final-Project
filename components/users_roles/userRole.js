const { DataTypes } = require('sequelize');
const db = require('../../configs/db');

const userRole = db.define(
  'users_roles',
  {
    uid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    rid: {
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
