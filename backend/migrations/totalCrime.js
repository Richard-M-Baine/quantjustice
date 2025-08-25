'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TotalCrimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Offense: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      AverageIncarcerationDays: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TotalCasesDays: {
        type: Sequelize.STRING,
        allowNull: true
      },
      TotalIncarcerationDays: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MaxSentenceDays: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MinSentenceDays: {
        type: Sequelize.STRING,
        allowNull: true
      },
      StdDevSentence:{
        type: Sequelize.STRING,
        allowNull: true
      },
      MedianSentence: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ModeSentence: {
        type: Sequelize.STRING,
        allowNull: true
      },
      AverageProbationMonth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      TotalProbationMonthInstances: {
        type: Sequelize.STRING,
        allowNull: true
      },
      TotalProbationMonths: {
        type: Sequelize.STRING,
        allowNull: true
      },
      MaxProbationMonth: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MinProbationMonth: {
        type: Sequelize.STRING,
        allowNull: false
      },
      StdDevProbationMonth: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MedianProbationMonth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ModeProbationMonth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TotalCrimes');
  }
};