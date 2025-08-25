'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CountyCrimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      County: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Offense: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      AverageIncarcerationLength: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TotalCasesYear: {
        type: Sequelize.STRING,
        allowNull: true
      },
      TotalIncarcerationAmount: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MaxSentence: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MinSentence: {
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
      AverageProbation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      TotalProbationInstances: {
        type: Sequelize.STRING,
        allowNull: true
      },
      TotalProbationMonthSum: {
        type: Sequelize.STRING,
        allowNull: true
      },
      MaxProbation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MinProbation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      StdDevProbation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MedianProbation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ModeProbation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ID: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('CountyCrimes');
  }
};