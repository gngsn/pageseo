const util = require('../modules/utils/util');
const {
    s3,
    BUCKET
} = require('../modules/multer');


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
        if (err) console.log(err, err.stack);
        console.log('success delete : ', data);
    });
    return res.status(statusCode).send(util.fail(statusCode, message));
};

const handleManyMulterError = async (err, res, keys) => {
    const {
        statusCode,
        message
    } = err;

    await s3.deleteObjects({
        Bucket: BUCKET,
        Delete: {
            Objects: keys
        }
    }, (err, data) => {
        if (err) console.log(err, err.stack);
        console.log('success delete : ', data);
    });
    return res.status(statusCode).send(util.fail(statusCode, message));
};

module.exports = {
    handleMulterError,
    handleManyMulterError
}