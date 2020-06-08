var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'User ~' });
});
router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.get('/test', userController.test);

module.exports = router;
