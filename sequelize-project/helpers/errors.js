// var s3 = new AWS.S3();
const util = require('../modules/utils/util');
const {
    s3,
    BUCKET
} = require('../modules/multer');

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

const handleMulterError = async (err, res, key) => {
    const {
        statusCode,
        message
    } = err;
    console.log(key);
    await s3.deleteObject({
        Bucket: BUCKET,
        Key: key
    }, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data);
            console.log('삭제 성공!');
        }
    });
    return res.status(statusCode).send(util.fail(statusCode, message));
};

module.exports = {
    ErrorHandler,
    handleError,
    handleMulterError
}