'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JudgeCrimes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Judge: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Offense: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      AverageIncarcerationYear: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      TotalCasesYear: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      TotalIncarcerationYears: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MaxSentenceYear: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MinSentenceYear: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      StdDevSentenceYear: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      MedianSentenceYear: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ModeSentenceYear: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      AverageProbationMonth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      TotalProbationMonthInstances: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      TotalIncarcerationMonth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      MaxProbationMonth: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MinProbationMonth: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      StdDevProbationMonth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      MedianProbationMonth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ModeProbationMonth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      County: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      JudgeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Judges', // Must match the table name in Judges migration
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JudgeCrimes');
  },
};
