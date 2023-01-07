var express = require('express');
var router = express.Router();

/* GET /api/blog */
router.get('/', (req, res) => {
    const post = {
        title: 'express, 어렵지 않게 사용하기',
        author: 'gngsn',
        content: 'express 사용법에 대해 알아보고 있습니다.\n 나쁘지 않죠?'
    }
    const result = {
        status: 200,
        message: 'blog 접근 성공 〰️',
        data: post
    }
    res.status(200).send(result);
});

module.exports = router;