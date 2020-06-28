const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/multer');

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/profile', AuthMiddleware.checkToken, upload.single, UserController.updateProfile);

module.exports = router;