'use strict';

module.exports = (sequelize, DataTypes) => {
  const CountyCrime = sequelize.define('CountyCrime', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    County: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Offense: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AverageIncarcerationLength: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TotalCasesYear: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TotalIncarcerationAmount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MaxSentence: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MinSentence: {
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
    AverageProbation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TotalProbationInstances: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TotalProbationMonthSum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    MaxProbation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MinProbation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    StdDevProbation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MedianProbation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ModeProbation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'CountyCrime',
    timestamps: true, // This enables createdAt and updatedAt
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  // Define associations here if needed
  CountyCrime.associate = function(models) {
    // associations can be defined here
  };

  return CountyCrime;
};