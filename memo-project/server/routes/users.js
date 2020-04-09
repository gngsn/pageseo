var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json([
    {id: 1, username: "somebody"},
    {id: 2, username: "somebody_else"}
  ]);
});

module.exports = router;
