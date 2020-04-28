const table = 'user';
const poolPromise = require('../config/dbConfig')

const user = {
    getUserByName:  async (username) => {
        const query = `SELECT * FROM ${table} WHERE name = '${username}'`;
        try {
            const pool = await poolPromise;
            const connection = await pool.getConnection();
            try {
                result = await connection.query(query) || null;
            } catch (queryError) {
                connection.rollback(() => {});
                console.log('[user.js]  ', queryError);
            }
            pool.releaseConnection(connection);
        } catch (connectionError) {
            console.log('[user.js]  ',connectionError);
        }
        return result[0];
    },
    getUserById:  async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
        try {
            const pool = await poolPromise;
            const connection = await pool.getConnection();
            try {
                result = await connection.query(query) || null;
            } catch (queryError) {
                connection.rollback(() => {});
                console.log('[user.js]  ', queryError);
            }
            pool.releaseConnection(connection);
        } catch (connectionError) {
            console.log('[user.js]  ',connectionError);
        }
        const data = result[0];
        const dto = {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone
        } 
        return dto;
    },
    userCheck: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
        let result;
        try {
            const pool = await poolPromise;
            const connection = await pool.getConnection();
            try {
                result = await connection.query(query) || null;
            } catch (queryError) {
                connection.rollback(() => {});
                console.log('[user.js]  ', queryError);
            }
            pool.releaseConnection(connection);
        } catch (connectionError) {
            console.log('[user.js]  ',connectionError);
        }
        if (result.length > 0) {
            // user가 있을 때 - false, 없으면 true
            return false;
        } else return true;
    },
    signup: async (id, name, password, salt, email, phone) => {
        const fields = 'id, name, password, salt, email, phone';
        const questions = `'${id}', '${name}', '${password}', '${salt}', '${email}', '${phone}'`;
        let result;
        try {
            const pool = await poolPromise;
            const connection = await pool.getConnection();
            try {
                result = await connection.query(`INSERT INTO ${table}(${fields}) VALUES(${questions})`) || null;
            } catch (queryError) {
                connection.rollback(() => {});
                console.log('[user.js]  ', queryError);
            }
            pool.releaseConnection(connection);
        } catch (connectionError) {
            console.log('[user.js]  ',connectionError);
            return false;
        }
        return true;
    }
}

module.exports = user;