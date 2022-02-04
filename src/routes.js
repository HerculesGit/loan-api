const { Router } = require('express')
const routes = new Router()

const LoanController = require('./controllers/loan_controller')

// e.g. /loans?status=done 
routes.get('/loans', LoanController.getLoansByStatus)

// e.g. /loans/search?name=nay
routes.get('/loans/search', LoanController.findLoanByNameContains)

// e.g. /loans body={name, value}
routes.post('/loans', LoanController.createLoan)

// e.g. /loans/bd71f6a7-1059-41f0-ab73-f9a28984f565 body={name, value}
routes.put('/loans/:id', LoanController.editLoan)

// e.g. /loans/bd71f6a7-1059-41f0-ab73-f9a28984f565
routes.delete('/loans/:id', LoanController.deleteLoan)


module.exports = routes