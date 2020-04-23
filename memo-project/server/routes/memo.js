var express = require('express');
var router = express.Router();
const memoController = require('../controllers/memoController');

router.get('/', memoController.readAll);
router.post('/', memoController.write);

module.exports = router;