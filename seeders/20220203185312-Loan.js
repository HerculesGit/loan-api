'use strict';

const LoanStatus = require('../enums/loan_types')
const TableNames = require('../src/constants/table_names')
const { createdAt, updatedAt, loan1, loan2 } = require('../src/utils/seeders_utils')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(TableNames.Loans, [{
      id: loan1,
      name: 'Pagamento da conta de Marquinho',
      status: LoanStatus.done,
      value: 40.0,
      createdAt, updatedAt
    }], {});

    await queryInterface.bulkInsert(TableNames.Loans, [{
      id: loan2,
      name: 'John Doe',
      status: LoanStatus.open,
      value: 10.0,
      createdAt, updatedAt
    }], {});

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TableNames.Loans, null, {});
  }
};
