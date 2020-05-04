const FacebookStrategy = require('passport-facebook').Strategy;
const authService = require('../services/authService');
const passportKey = require('../config/passportKey');

module.exports = (passport) => {
    passport.use(new FacebookStrategy({
            clientID: passportKey.federation.facebook.ID,
            clientSecret: passportKey.federation.facebook.KEY,
            profileFields: ['id', 'displayName', 'email'],
            callbackURL: 'http://localhost:3333/auth/facebook/callback'
        },

        function (accessToken, refreshToken, profile, done) {
            const socialId = 'facebook:'+profile.id;
            const nickname = profile.displayName;
            const email = profile.emails[0].value;
            onLoginSuccess(socialId, nickname, email, done);
        }
    ));

    // passport.use(new GithubStrategy({
    //         clientID: "",
    //         clientSecret: "",
    //         callbackURL: 'http://localhost:3000/markdown/auth/github/callback'
    //     }, function (accessToken, refreshToken, profile, done) {
    //         const socialId = profile.id;
    //         const nickname = profile.username;
    //         const profileImageUrl = profile.photos[0].value;

    //         onLoginSuccess('Github', socialId, nickname, profileImageUrl, done);
    //     }
    // ));

    // passport.use(new GoogleStrategy({
    //         clientID: "",
    //         clientSecret: "",
    //         callbackURL: 'http://localhost:3000/markdown/auth/google/callback',
    //         scope: ['https://www.googleapis.com/auth/plus.me']
    //     }, function (accessToken, refreshToken, profile, done) {
    //         const socialId = profile.id;
    //         const nickname = profile.displayName;
    //         const profileImageUrl = profile.photos[0].value;

    //         onLoginSuccess('Google', socialId, nickname, profileImageUrl, done);
    //     }
    // ));

    async function onLoginSuccess(socialId, nickname, email, done) {
        const user = await authService.findOrCreate(socialId, nickname, email);
        done(null, user);
    }

    passport.serializeUser( async (user, done) => {
        console.log(`serializeUser :`+user);
        if (user.state == 1 ){
            console.log('user 생성');
        } else if (user.state == 2 ){
            console.log('user 로그인');
        } else {
            console.log('error');
        }
        
        const id = user.id;
        done(null, id);
    });

    passport.deserializeUser( async (id, done) => {
        console.log(`deserializeUser : ${id}`);
        const user = await authService.findByID(id);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });

};