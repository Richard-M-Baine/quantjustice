const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class JudgeCrime extends Model {}

  JudgeCrime.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Judge: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Offense: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AverageIncarcerationYear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TotalCasesYear: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TotalIncarcerationYears: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MaxSentenceYear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MinSentenceYear: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      StdDevSentenceYear: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      MedianSentenceYear: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ModeSentenceYear: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      AverageProbationMonth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TotalProbationMonthInstances: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TotalIncarcerationMonth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      MaxProbationMonth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MinProbationMonth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      StdDevProbationMonth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MedianProbationMonth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ModeProbationMonth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'JudgeCrime',
      tableName: 'JudgeCrime',
      timestamps: true,
      underscored: false,
    }
  );

  return JudgeCrime;
};