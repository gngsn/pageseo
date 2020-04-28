const express = require('express');
const router = express.Router();
const passport = require('passport');

/* 
	localhost:3000/auth/login
    local strategy을 사용해서 로그인 시도
    로그인 성공 시 redirect : 'localhost:3000/auth'
    로그인 실패 시 redirect : 'localhost:3000/auth/login'
*/
router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth',
    failureRedirect: '/auth/login',
    failureFlash: false
}));

router.get('/', (req, res) => {
    const data = req.user;
    console.log('auth.js - data : ', data);
    res.send(data);
});

/*  --------------   추가할 부분  --------------
	localhost:3000/auth/facebook
    facebook strategy을 사용해서 로그인 시도
    로그인 성공 시 redirect : 'localhost:3000/auth'
    로그인 실패 시 redirect : 'localhost:3000/auth/login'
*/
router.get('/facebook', passport.authenticate('facebook', { scope: 'email'}));
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/auth',
    failureRedirect: '/auth/fail'
}));
/* --------------------------------------------- */

module.exports = router;