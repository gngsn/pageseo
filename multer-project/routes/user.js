var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/'
});
const multiImg = upload.fields([{ name: 'background', maxCount: 1 }, { name: 'profiles', maxCount: 3 }]);

router.post('/profile', upload.single('image'), UserController.uploadImage);
router.post('/selfies', upload.array('image', 4), UserController.uploadImages);
router.post('/multi', multiImg, UserController.uploadMultiImages);

module.exports = router;
