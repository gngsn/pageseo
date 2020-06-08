var express = require('express');
var router = express.Router();
const ChatController = require('../controllers/chat');

router.get('/', ChatController.readAll);
router.post('/', ChatController.write);

module.exports = router;