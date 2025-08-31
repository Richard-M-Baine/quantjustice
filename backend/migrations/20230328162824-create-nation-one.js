'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nationOnes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lastName: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.STRING
      },
      agency: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      info: {
        type: Sequelize.STRING,
        allowNull: true
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nationOnes');
  }
};