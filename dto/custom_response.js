class CustomResponse {

    constructor(status, data, hasError, errorMessage) {
        this.status = status;
        this.data = data;
        this.hasError = hasError;
        this.errorMessage = errorMessage;
    }
}
module.exports = CustomResponse;