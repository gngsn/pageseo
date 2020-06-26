const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/multer');

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/profile', AuthMiddleware.checkToken, upload.many(1), UserController.updateProfile);

module.exports = router;