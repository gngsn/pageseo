const crypto = require('crypto');

module.exports = {
    encrypt: async (password, salt) => {
        return new Promise(async (resolve, reject) => {
            try {
                crypto.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
                    if(err) throw err;
                    const hashed = derivedKey.toString('hex');
                    resolve(hashed);
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    }
}