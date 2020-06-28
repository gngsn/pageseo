const multer = require('multer');
const upload = require('../modules/multer').upload;
const util = require('../modules/utils/util');
const CODE = require('../modules/utils/statusCode');
const MSG = require('../modules/utils/responseMessage');
const {
    ErrorHandler
} = require('../helpers/errors');
const {
    handleMulterError,
    handleManyMulterError
} = require('../helpers/multerError');

module.exports = {
    single: async (req, res, next) => {
        await upload.single('image')(req, res, (err) => {
            const key = req.file.key;
            if (err) {
                console.log('multer upload error : ', err);
                if (err.field !== 'image')
                    return singleFileError(res, MSG.WRONG_FIELD_NAME, key);
                return singleFileError(res, MSG.BAD_REQUEST_IMAGE, key);
            }
            // 용량 제한 2MB
            if (req.file.size > 2 * 1000 * 1000)
                return singleFileError(res, MSG.TOO_LARGE_FILE, key);

            const type = req.file.mimetype.split('/')[1];
            if (type !== 'jpeg' && type !== 'jpg' && type !== 'png')
                return singleFileError(res, MSG.UNSUPPORTED_TYPE, key);
            next();
        });
    },
    many: (img) => {
        return async (req, res, next) => {
            await upload.array('image')(req, res, async (err) => {
                if (err) {
                    console.log('multer upload error : ', err);
                    if (err.field !== 'image')
                        return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.WRONG_FIELD_NAME));
                    return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE));
                }

                const keys = req.files.map(e => {
                    return {
                        Key: e.key
                    }
                });

                // 요청 이미지 개수 제어
                if (req.files.length > img)
                    return manyFileError(res, MSG.BAD_REQUEST_IMAGE + ` 이미지를 ${img}장만 보내주세요.`, keys);

                for (const file of req.files) {
                    // 용량 제한 2MB
                    if (file.size > 2 * 1000 * 1000)
                        return manyFileError(res, MSG.TOO_LARGE_FILE, keys);

                    const type = file.mimetype.split('/')[1];
                    if (type !== 'jpeg' && type !== 'jpg' && type !== 'png')
                        return manyFileError(res, MSG.UNSUPPORTED_TYPE, keys);
                }
                next();
            });
        }
    }
}

const singleFileError = (res, message, key) => {
    const err = new ErrorHandler(CODE.BAD_REQUEST, message);
    return handleMulterError(err, res, key);
}

const manyFileError = (res, message, keys) => {
    const err = new ErrorHandler(CODE.BAD_REQUEST, message);
    return handleManyMulterError(err, res, keys);
}