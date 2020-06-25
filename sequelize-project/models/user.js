const pool = require('../modules/pool');
const models = require('./dao/index');

const user = {
    signup: async (id, name, password, salt, email) => {
        try {
            return await models.User.create({
                id: id,
                name: name,
                password: password,
                salt: salt,
                email: email
            });
        } catch (err) {
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    checkUser: async (id) => {
        try {
            const result = await models.User.findAll({
                where: {
                    id: id
                }
            });
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    getUserById: async (id) => {
        try {
            return models.User.findAll({
                where: {
                    id: id
                }
            });
        } catch (err) {
            console.log('getUserById ERROR : ', err); 
            throw err;
        }
    },
    updateProfile: async (userIdx, profile) => {
        let query = `UPDATE ${table} SET image="${profile}" WHERE userIdx="${userIdx}"`;
        try {
            await pool.queryParam(query);
            query = `SELECT id, name, email, image FROM ${table} WHERE userIdx="${userIdx}"`;
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('update profile ERROR : ', err);
            throw err;
        }
    }
}

module.exports = user;