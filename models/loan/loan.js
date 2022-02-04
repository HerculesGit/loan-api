'use strict';
const { Model } = require('sequelize')
const uuid = require('uuid').v4

const LoanStatus = require('../../enums/loan_types')

module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    static associate(models) {
    }
  }
  Loan.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      primaryKey: true
    },
    name: DataTypes.STRING,
    value: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM(Object.values(LoanStatus)),
      defaultValue: () => LoanStatus.open,
    }
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan
};