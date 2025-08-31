// models/kettlehundes.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Kettlehundes extends Model {
    // You can add associations here later if needed
    static associate(models) {
      // define association here
    }
  }

  Kettlehundes.init(
    {
      Year: {
        type: DataTypes.INTEGER,
      },
      AgencyName: {
        type: DataTypes.STRING,
      },
      County: {
        type: DataTypes.STRING,
      },
      Number: {
        type: DataTypes.INTEGER,
      },
      Rank: {
        type: DataTypes.STRING,
      },
      FirstName: {
        type: DataTypes.STRING,
      },
      LastName: {
        type: DataTypes.STRING,
      },
      Terminated: {
        type: DataTypes.STRING,
      },
      Demoted: {
        type: DataTypes.STRING,
      },
      Suspended: {
        type: DataTypes.STRING,
      },
      SuspendedDays: {
        type: DataTypes.INTEGER,
      },
      SustainedCharge: {
        type: DataTypes.TEXT, // unlimited length
      },
      Description: {
        type: DataTypes.TEXT, // unlimited length
      },
    },
    {
      sequelize,
      modelName: 'Kettlehundes',
      tableName: 'Kettlehundes',
      timestamps: false, // you didn’t define createdAt/updatedAt in migration
    }
  );

  return Kettlehundes;
};
