'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kettlehunde extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kettlehunde.init({
    Year: DataTypes.INTEGER,
    AgencyName: DataTypes.STRING,
    County: DataTypes.STRING,
    Number: DataTypes.INTEGER,
    Rank: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Terminated: DataTypes.STRING,
    Demoted: DataTypes.STRING,
    Suspended: DataTypes.STRING,
    SuspendedDays: DataTypes.INTEGER,
    SustainedCharge: DataTypes.STRING,
    Description: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Kettlehunde',
  });
  return Kettlehunde;
};