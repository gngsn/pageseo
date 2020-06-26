var s3 = new AWS.S3();

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
    res.status(statusCode).send(util.fail(statusCode, message));
};

const handleMulterError = (err, res) => {
    const {
        statusCode,
        message
    } = err;
    s3.abortMultipartUpload(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });

    res.status(statusCode).send(util.fail(statusCode, message));
};

module.exports = {
    ErrorHandler,
    handleError,
    handleMulterError
}