const util = require('../modules/utils/util');
const CODE = require('../modules/utils/statusCode');
const MSG = require('../modules/utils/responseMessage');

module.exports = {
    single: async (req, res) => {
        const image = req.file;
        res.status(CODE.OK).send(util.success(CODE.OK, MSG.SAVE_IMAGE_SUCCESS, {
            image: image.location
        }));
    },
    array: async (req, res) => {
        const images = req.files;
        const location = images.map(img => img.location);
        return res.status(CODE.OK).send(util.success(CODE.OK, images.length + '개의 '+ MSG.SAVE_IMAGE_SUCCESS, {
            images: location
        }));
    }
}