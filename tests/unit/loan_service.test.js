const LoanService = require('../../src/services/loan_service')
const LoanStatus = require('../../enums/loan_types');
const { initializeLoanDatabase, deleteParanoid } = require('../helpers/helpers');
const { loan1, loan2, loan3, createdAt, updatedAt } = require('../../src/utils/seeders_utils')

describe('Loan Service', () => {

    const loanId = '22c5e068-3126-43b7-b070-adb55acc0466'
    const loanName = 'Loan created'
    const loanValue = 0.2
    const loanStatus = LoanStatus.done

    const loanToCreate = {
        id: loanId,
        name: loanName,
        value: loanValue,
        status: loanStatus
    }
    beforeEach(async () => {
        await initializeLoanDatabase()
    });

    it('should create a loan', async () => {
        const loanCreated = (await LoanService.create(loanToCreate)).data
        deleteParanoid(loanCreated)
        expect(loanCreated).toEqual(loanToCreate)
    })

    it('should edit a loan', async () => {
        const loanToUpdate = {
            id: loan1,
            name: 'I lent a book to zezinho',
            value: 10000,
            status: LoanStatus.open
        }

        const loanUpdated = (await LoanService.update(loan1, loanToUpdate)).data
        deleteParanoid(loanUpdated)
        expect(loanUpdated).toEqual(loanToUpdate)

        const loanFromDB = (await LoanService.findById(loan1)).data
        deleteParanoid(loanFromDB)
        expect(loanFromDB).toEqual(loanToUpdate)
    })

    it('should delete a loan', async () => {
        const loanToUpdate = {
            id: loan1,
            name: 'I lent a book to zezinho',
            value: 10000,
            status: LoanStatus.open
        }

        await LoanService.delete(loan1)
        const loanNull = (await LoanService.findById(loan1)).data
        expect(loanNull).toEqual(null)
    })

    it('should findAll loans that status="open"', async () => {
        const status = LoanStatus.open
        const customLoans = await LoanService.getByStatus(status)

        const loanMocked = {
            id: loan2,
            name: 'John Doe',
            value: 10,
            status: 'open'
        }

        expect(Object.values(customLoans.data).length).toBe(1)

        const loanFromDB = customLoans.data[0]
        deleteParanoid(loanFromDB)

        expect(loanFromDB).toStrictEqual(loanMocked)
    });

    it('should findAll loans that status="done"', async () => {
        const status = LoanStatus.done
        const customLoans = await LoanService.getByStatus(status)

        const loanMocked = {
            id: '71c5e068-3126-43b7-b070-adb55acc0463',
            name: 'Pagamento da conta de Marquinho',
            value: 40,
            status: 'done'
        }

        const loanFromDB = customLoans.data[0]
        deleteParanoid(loanFromDB)

        expect(Object.values(customLoans.data).length).toBe(1)
        expect(loanFromDB).toStrictEqual(loanMocked)
    });

    it('should find loans by name contains criteria', async () => {
        let value = 10.2

        await LoanService.create({
            name: 'Hippolyte',
            value: value,
            status: LoanStatus.open,
        })

        await LoanService.create({
            name: 'Hiris',
            value: value,
            status: LoanStatus.open,
        })

        await LoanService.create({
            name: 'Narayana',
            value: value,
            status: LoanStatus.open,
        })

        await LoanService.create({
            name: 'Nayana',
            value: value,
            status: LoanStatus.open,
        })

        await LoanService.create({
            name: 'Gargi',
            value: value,
            status: LoanStatus.open,
        })

        await LoanService.create({
            name: 'Ǫrvar',
            value: value,
            status: LoanStatus.open,
        })

        let criteria = 'Na'
        let amount = 2

        const loansFromDB = (await LoanService.findByNameContains(criteria)).data
        expect(loansFromDB.length).toStrictEqual(amount)
    })

    it('should return status 400 when status property is null', async () => {
        const customError = await LoanService.getByStatus(null)

        expect(customError.data).toEqual(null)
        expect(customError.errorMessage).toEqual('query -> status is undefined')
        expect(customError.hasError).toEqual(true)
    });

    it('should create a loan with the bellow values', async () => {
        const loanCreated = (await LoanService.create(loanToCreate)).data
        const loanFromDB = (await LoanService.findById(loanId)).data

        deleteParanoid(loanCreated)
        deleteParanoid(loanFromDB)

        expect(loanCreated).toStrictEqual(loanFromDB)
    })
})