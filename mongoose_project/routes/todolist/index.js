var express = require('express');
var router = express.Router();
const todolistController = require('../../controllers/todolistController');

router.get('/', todolistController.readAll);
router.get('/:todoId', todolistController.read);
router.post('/', todolistController.write);
router.delete('/:todoId', todolistController.delete);

module.exports = router;