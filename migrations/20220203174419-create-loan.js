'use strict';

const LoanStatus = require('../enums/loan_types')
const TableNames = require('../src/constants/table_names')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TableNames.Loans, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(Object.values(LoanStatus))
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TableNames.Loans)
  }
};