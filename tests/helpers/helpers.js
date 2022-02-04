const LoanStatus = require('../../enums/loan_types')
const models = require('../../models')
const { loan1, loan2, createdAt, updatedAt } = require('../../src/utils/seeders_utils')

const initializeLoanDatabase = async () => {
    await models.Loan.destroy({
        where: {},
        truncate: true
    })
    console.log('clear database')

    await models.Loan.create({
        id: loan1,
        name: 'Pagamento da conta de Marquinho',
        status: LoanStatus.done,
        value: 40.0,
        createdAt, updatedAt
    })
    await models.Loan.create({
        id: loan2,
        name: 'John Doe',
        status: LoanStatus.open,
        value: 10.0,
        createdAt, updatedAt
    })
}

const deleteParanoid = (loan) => {
    try {
        delete loan['createdAt']
    } catch (error) { }

    try {
        delete loan['updatedAt']
    } catch (error) { }
}

module.exports = {
    initializeLoanDatabase,
    deleteParanoid,
}