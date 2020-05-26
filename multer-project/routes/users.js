var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'uploads/'
});
const UserController = require('../controllers/user');

router.post('/profile', upload.single('image'), UserController.uploadProfile);
router.post('/selfies', upload.array('image', 4), UserController.uploadImages);

module.exports = router;
