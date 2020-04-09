var express = require('express');
var router = express.Router();
const memoController = require('../controllers/memoController');

router.get('/', memoController.readAll);
router.get('/:todoId', memoController.read);
router.post('/', memoController.write);

module.exports = router;