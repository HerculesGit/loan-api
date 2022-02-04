const models = require('../../models')
const CustomResponse = require('../../dto/custom_response')
const ValidatorUtils = require('../utils/validator_utils')
const { Op } = require('sequelize')

class LoanService {

    async create(loanToCreate) {
        try {
            if (ValidatorUtils.isNull(loanToCreate)) {
                return new CustomResponse(400, null, true, 'loan is null')
            } else {
                const response = await models.Loan.create(loanToCreate, {
                    returning: true,
                    raw: true,
                    plain: true
                })
                return new CustomResponse(200, response.toJSON(), false)
            }
        } catch (error) {
            console.log(error)
            return new CustomResponse(500, null, true, `Internal server error \n${error}`)
        }
    }

    /**
     * Update if exits. If there is not throws the exception
     * @param {*} loanId 
     * @param {*} loanToEdit 
     * @returns 
     */
    async update(loanId, loanToEdit) {
        try {
            if (ValidatorUtils.isNull(loanToEdit)) {
                return new CustomResponse(400, null, true, 'loan is is null')
            } else if (ValidatorUtils.isNull(loanId)) {
                return new CustomResponse(400, null, true, 'loan id cannot be null')
            } else {
                await models.Loan.update(
                    loanToEdit,
                    {
                        where: { id: loanId },
                        returning: true, omitNull: false, raw: true
                    },
                )
                const loanFromDB = (await this.findById(loanId))
                return loanFromDB
            }
        } catch (error) {
            console.log(error)
            return new CustomResponse(500, null, true, `Internal server error \n${error}`)
        }
    }

    /**
     * Delete the loan if exists.
     * @param {*} loanId 
     * @returns 
     */
    async delete(loanId) {
        try {
            if (ValidatorUtils.isNull(loanId)) {
                return new CustomResponse(400, null, true, 'loan id cannot be null')
            } else {
                const response = await models.Loan.destroy({
                    where: { id: loanId },
                    returning: true, omitNull: false, raw: true
                })
                return new CustomResponse(200, response, false)
            }
        } catch (error) {
            console.log(error)
            return new CustomResponse(500, null, true, `Internal server error \n${error}`)
        }
    }

    async findById(loanId) {
        try {
            if (ValidatorUtils.isNull(loanId)) {
                return new CustomResponse(400, null, true, 'the id property cannot be null')
            } else {
                const response = await models.Loan.findOne({
                    where: { id: loanId }
                    , raw: true,
                })

                // when not found loan
                if (ValidatorUtils.isNull(response)) {
                    return new CustomResponse(404, null, true, `Loan not found for ${loanId}`)
                }

                return new CustomResponse(200, response, false)
            }
        } catch (error) {
            console.log(error)
            return new CustomResponse(500, null, true, `Internal server error \n${error}`)
        }
    }
    async findByNameContains(criteria) {
        try {
            if (ValidatorUtils.isNull(criteria)) {
                return new CustomResponse(400, null, true, 'criteria cannot be null')
            } else {
                let response = await models.Loan.findAll({
                    where: {
                        name: {
                            [Op.like]: '%' + criteria + '%'
                        }
                    }, raw: true
                })

                response = response ? response : []
                return new CustomResponse(200, response, false)
            }
        } catch (error) {
            console.log(error)
            return new CustomResponse(500, null, true, `Internal server error \n${error}`)
        }
    }



    async getByStatus(status) {
        try {
            if (ValidatorUtils.isNull(status)) {
                return new CustomResponse(400, null, true, 'query -> status is undefined')
            } else {
                const response = await models.Loan.findAll({
                    where: {
                        status: status,
                    },
                    raw: true,
                })

                return new CustomResponse(200, response, false)
            }
        } catch (error) {
            console.log(error)
            return new CustomResponse(500, null, true, `Internal server error \n${error}`)
        }
    }

    async sendResponse(res, customResponse) {
        return res.status(customResponse.status).send(customResponse)
    }
}

module.exports = new LoanService()