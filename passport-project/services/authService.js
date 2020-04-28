const User = require('../models/user.js');

module.exports = {
    findOrCreate: async (socialId, nickname, email) => {
        try {
            const isThere = await User.userCheck(socialId);
            const user = {
                id: socialId,
                name: nickname,
                email: email,
                state: 0
            }
            if (isThere) {
                console.log('user가 없습니다');
                await User.signup(socialId, nickname, '','', email);
                user.state = 1;
            } else {
                console.log('user가 있습니다');
                user.state = 2;
            }
            return user;
        } catch {
            return false;
        }
    }
}