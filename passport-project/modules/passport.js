const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passportKey = require('../config/passportKey');
const authService = require('../services/authService');
const User = require('../models/user');
const encrypt = require('./encrypt');
let passport = require('passport');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const result = await User.getUserByName(username);
        if (!result) {
            console.log('사용자를 찾을 수 없습니다.');
            return done(null, false);
        }
        const digest = await encrypt.encrypt(password, result.salt);
        console.log('passport.js - digest : ', digest);
        if (digest !== result.password) {
            console.log('비밀번호 오류입니다.');
            return done(null, false);
        }
        done(null, dto);
    }
));

passport.use(new FacebookStrategy({
        clientID: passportKey.federation.facebook.ID,
        clientSecret: passportKey.federation.facebook.KEY,
        profileFields: ['id', 'displayName', 'email'],
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },

    async (accessToken, refreshToken, profile, done) => {
        const socialId = 'facebook:' + profile.id;
        const nickname = profile.displayName;
        const email = profile.emails[0].value;
        const user = await authService.findOrCreate(socialId, nickname, email);
        done(null, user);
    }
));


passport.serializeUser(async (user, done) => {
    console.log('serializeUser', user.id);
    // done 의 두 번째 인자로 user를 구분해줄 수 있는 값인 id를 넣어줌
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // 다시 들어오면 serializeUser의 done 의 두 번째 인자로 넘어온 id를 첫 번째 인자로 받아 사용
    console.log('deserializeUser', id);
    const user = await User.getUserById(id);
    if (user) {
        return done(null, user);
    }
    done('There is no user.');
});
