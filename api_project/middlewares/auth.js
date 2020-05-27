const jwt = require('../module/jwt');
const MSG = require('../module/utils/responseMessage');
const CODE = require('../module/utils/statusCode');
const util = require('../module/utils/util');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkToken: async (req, res, next) => {
        var token = req.headers.jwt;
        if (!token) {
            return res.json(util.fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN));
        }
        const user = jwt.verify(token);
        if (user === TOKEN_EXPIRED) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
        }
        if (user === TOKEN_INVALID) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
        }
        if (user.idx === undefined) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
        }
        req.decoded = user;
        next();
    }
}
module.exports = authUtil;