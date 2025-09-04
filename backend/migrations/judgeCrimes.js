'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('JudgeCrimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Judge: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      Offense: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      AverageIncarcerationYear: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TotalCasesYear: {
        type: Sequelize.STRING,
        allowNull: true
      },
      TotalIncarcerationYears: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MaxSentenceYear: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MinSentenceYear: {
        type: Sequelize.STRING,
        allowNull: true
      },
      StdDevSentenceYear:{
        type: Sequelize.STRING,
        allowNull: true
      },
      MedianSentenceYear: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ModeSentenceYear: {
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
      TotalIncarcerationMonth: {
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
        allowNull: true
      },
      MedianProbationMonth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ModeProbationMonth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      County: {
        type: Sequelize.STRING,
        allowNull: false
      },
      IDD: {
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
    await queryInterface.dropTable('JudgeCrimes');
  }
};