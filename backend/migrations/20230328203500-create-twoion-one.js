'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TwoNations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FirstName:{
        type: Sequelize.STRING
      },
      MiddleName:{
        type: Sequelize.STRING
      },
      LastName:{
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      Agency: {
        type: Sequelize.STRING
      },
      Year: {
        type: Sequelize.STRING
      },
      Link: {
        type: Sequelize.STRING
      },
   
   
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TwoNations');
  }
};