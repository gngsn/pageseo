var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const AuthMiddleware = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'User ~'
    });
});

router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/profile', upload.single('profile'), AuthMiddleware.checkToken, userController.updateProfile);
module.exports = router;
