const multer = require('multer');
const upload = require('../modules/multer');
const util = require('../modules/utils/util');
const CODE = require('../modules/utils/statusCode');
const MSG = require('../modules/utils/responseMessage');
const Error = require('../helpers/errors');

module.exports = {
    single: async (req, res, next) => {
        await upload.single('image')(req, res, (err) => {
            if (err) {
                console.log('multer upload error : ', err);
                if (err.field !== 'image')
                    return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.WRONG_FIELD_NAME));
                return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE));
            }
            // 용량 제한 2MB
            if (req.file.size > 2 * 1000 * 1000)
                return res.status(CODE.OK).send(util.success(CODE.OK, MSG.TOO_LARGE_FILE));

            const type = req.file.mimetype.split('/')[1];
            if (type !== 'jpeg' && type !== 'jpg' && type !== 'png')
                return res.status(CODE.OK).send(util.success(CODE.OK, MSG.UNSUPPORTED_TYPE));
            console.log(req.file);
            next();
        });
    },
    many: (img) => {
        return async (req, res, next) => {
            await upload.array('images')(req, res, (err) => {
                // 요청 이미지 개수 제어
                if (req.files.length > img) {
                    return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE + ` 이미지를 ${img}장만 보내주세요.`));
                }
                if (err instanceof multer.MulterError) {
                    console.log('multer upload error : ', err);
                    if (err.field !== 'images')
                        return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.WRONG_FIELD_NAME));
                    return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE));
                } else if (err) {
                    console.log('unknown error : ', err);
                    return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE));
                }
                next();
            });
        }
    }
}