var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'uploads/'
});
const UserController = require('../controllers/userController');

router.post('/profile', upload.single('image'), UserController.uploadProfile);

module.exports = router;
