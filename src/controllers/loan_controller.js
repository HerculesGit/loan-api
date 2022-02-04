
const LoanService = require('../services/loan_service')

class LoanController {

    /**
     * 
     * @param {*} req - sequelize req property
     * @param {*} res - sequelize res property
     */
    async getLoansByStatus(req, res) {
        const status = req.query.status
        const customLoans = await LoanService.getByStatus(status)
        await LoanService.sendResponse(res, customLoans)
    }

    async findLoanByNameContains(req, res) {
        const name = req.query.name
        const customLoans = await LoanService.findByNameContains(name)
        await LoanService.sendResponse(res, customLoans)
    }

    async createLoan(req, res) {
        const { name, value } = req.body
        const customLoanCreated = await LoanService.create({ name, value })
        await LoanService.sendResponse(res, customLoanCreated)
    }

    async deleteLoan(req, res) {
        const id = req.params.id
        const customResponse = await LoanService.delete(id)
        await LoanService.sendResponse(res, customResponse)
    }

    async editLoan(req, res) {
        const id = req.params.id
        const { name, value, status } = req.body
        const customLoanUpdated = await LoanService.update(id, { name, value, status })
        await LoanService.sendResponse(res, customLoanUpdated)
    }

    async sendResponse(res, customResponse) {
        return res.status(customResponse.status).send(customResponse)
    }
}

module.exports = new LoanController()