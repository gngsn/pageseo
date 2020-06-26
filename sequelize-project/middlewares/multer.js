const multer = require('multer');
const upload = require('../modules/multer').upload;
const util = require('../modules/utils/util');
const CODE = require('../modules/utils/statusCode');
const MSG = require('../modules/utils/responseMessage');
const {
    ErrorHandler,
    _,
    handleMulterError
} = require('../helpers/errors');

module.exports = {
    single: async (req, res, next) => {
        await upload.single('image')(req, res, (err) => {
            const key = req.file.location;
            if (err) {
                console.log('multer upload error : ', err);
                if (err.field !== 'image') {
                    const err = new ErrorHandler(CODE.BAD_REQUEST, MSG.WRONG_FIELD_NAME);
                    return handleMulterError(err, res, key);
                }
                const err = new ErrorHandler(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE);
                return handleMulterError(err, res, key);
            }
            // 용량 제한 2MB
            if (req.file.size > 2 * 1000 * 1000) {
                const err = new ErrorHandler(CODE.BAD_REQUEST, MSG.TOO_LARGE_FILE);
                return handleMulterError(err, res, key);
            }

            const type = req.file.mimetype.split('/')[1];
            if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
                const err = new ErrorHandler(CODE.BAD_REQUEST, MSG.UNSUPPORTED_TYPE);
                return handleMulterError(err, res, key);
            }
            console.log(req.file);
            next();
        });
    },
    many: (img) => {
        return async (req, res, next) => {
            await upload.array('image')(req, res, (err) => {
                // 요청 이미지 개수 제어
                if (req.files.length > img) {
                    return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE + ` 이미지를 ${img}장만 보내주세요.`));
                }
                if (err) {
                    console.log('multer upload error : ', err);
                    if (err.field !== 'image')
                        return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.WRONG_FIELD_NAME));
                    return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE));
                }
                // 용량 제한 2MB
                if (req.files.size > 2 * 1000 * 1000) {
                    const err = new ErrorHandler(CODE.BAD_REQUEST, MSG.TOO_LARGE_FILE);
                    return handleMulterError(err, res, key);
                }

                console.log(req.files);
                req.files.array.forEach(e => {
                    const type = e.mimetype.split('/')[1];
                    if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
                        const err = new ErrorHandler(CODE.BAD_REQUEST, MSG.UNSUPPORTED_TYPE);
                        return handleMulterError(err, res, key);
                    }
                });
                next();
            });
        }
    }
}