var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user');
const upload = require('../modules/multer');

router.post('/profile', upload.single('image'), UserController.uploadImage);
router.post('/selfies', upload.array('image', 4), UserController.uploadImages);
// router.post('/multi', multiImg, UserController.uploadMultiImages);

module.exports = router;
