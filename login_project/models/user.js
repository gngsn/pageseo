const statusCode = require('../module/utils/statusCode');
const resMessage = require('../module/utils/responseMessage');
const encrypt = require('../module/encryption');
const util = require('../module/utils/util');
const pool = require('../module/pool');
const jwt = require('../module/jwt');
const table = 'user';

const user = {
    signin: (id, password) => {
        const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
        return pool.queryParam_None(query)
            .then( async (resultUser) => {
                if (resultUser.length == 0) {
                    return {
                        code: statusCode.OK,
                        json: util.successFalse(statusCode.OK, resMessage.NO_USER)
                    };
                }
                const user = resultUser[0];
                const {salt, hashed} = await encrypt.encryptWithSalt(password, user.salt);
                if (user.password != hashed) {
                    return {
                        code: statusCode.OK,
                        json: util.successFalse(statusCode.OK, resMessage.MISS_MATCH_PW)
                    };
                }
                const token = jwt.sign(user).token
                const responseData = {
                    jwt: token
                }
                return {
                    code: statusCode.OK,
                    json: util.successTrue(statusCode.OK,resMessage.SIGN_IN_SUCCESS,responseData)
                };
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    userCheck: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
        result = await pool.queryParam_None(query);
        if (result.length > 0) {
            return false;
        } else return true;
    },
    signup: (id, name, password, salt, email, phone) => {
        const fields = 'id, name, password, salt, email, phone';
        const questions = `?, ?, ?, ?, ?, ?`;
        const values = [id, name, password, salt, email, phone];
        return pool.queryParam_Parse(`INSERT INTO ${table}(${fields}) VALUES(${questions})`, values)
            .then(result => {
                if (result.code && result.json) return result;
                const userId = result.insertId;
                return {
                    code: statusCode.OK,
                    json: util.successTrue(statusCode.NO_CONTENT, resMessage.SIGN_UP_SUCCESS)
                };
            })
            .catch(err => {
                if (err.errno == 1062) {
                    console.log(err.errno, err.code);
                    return {
                        code: statusCode.BAD_REQUEST,
                        json: util.successFalse(statusCode.BAD_REQUEST, resMessage.ALREADY_ID)
                    };
                }
                console.log(err);
                throw err;
            });
    },
    test: async () => {
        const query = `SELECT * FROM ${table}`;
        result = await pool.queryParam_None(query);
        // console.log(result);
        const r = await Promise.all(
            result.map( async(re) => {
            console.log("re : ", re);
            const one = user.userCheck(2);
            const two = await user.userCheck(3);
            const three = await user.userCheck(4);
            return {one, two, three};
        }));
        
        console.log(r);
    }
}

module.exports = user;