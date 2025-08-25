'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TotalCrime extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  TotalCrime.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Offense: {
      type: DataTypes.STRING,
      allowNull: false
    },
    AverageIncarcerationDays: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TotalCasesDays: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TotalIncarcerationDays: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MaxSentenceDays: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MinSentenceDays: {
      type: DataTypes.STRING,
      allowNull: true
    },
    StdDevSentence: {
      type: DataTypes.STRING,
      allowNull: true
    },
    MedianSentence: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ModeSentence: {
      type: DataTypes.STRING,
      allowNull: true
    },
    AverageProbationMonth: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TotalProbationMonthInstances: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TotalProbationMonths: {
      type: DataTypes.STRING,
      allowNull: true
    },
    MaxProbationMonth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MinProbationMonth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    StdDevProbationMonth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MedianProbationMonth: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ModeProbationMonth: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'TotalCrime',
    tableName: 'TotalCrimes',
    timestamps: true
  });

  return TotalCrime;
};