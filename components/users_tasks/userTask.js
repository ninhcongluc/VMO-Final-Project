const { DataTypes } = require('sequelize');
const db = require('../../configs/db');

const userTask = db.define(
  'users_tasks',
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userTask;
