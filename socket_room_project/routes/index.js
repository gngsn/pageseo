var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  global.io.on('connection', (socket) => {
    console.log('socket connect !');
    socket.on('disconnect', () => {
      console.log('socket disconnect !');
    });
    socket.on('chat-msg-1', (msg) => {
      global.io.emit('chat-msg-2', msg);
    });
  });
  res.render('index', { title: 'Express' });
});


module.exports = router;
