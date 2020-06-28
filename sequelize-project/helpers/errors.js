// var s3 = new AWS.S3();
const util = require('../modules/utils/util');

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const {
        statusCode,
        message
    } = err;
    return res.status(statusCode).send(util.fail(statusCode, message));
};


module.exports = {
    ErrorHandler,
    handleError
}