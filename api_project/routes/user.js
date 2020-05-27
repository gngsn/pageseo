var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
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
router.post('/signup', upload.single('profile'), userController.signup);
// router.post('/profile', upload.single('image'), userController.signup);
module.exports = router;
