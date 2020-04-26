var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const result = {
        status: 200,
        message: 'api 접근 성공 〰️'
    }
    res.status(200).send(result);
});
router.use('/blog', require('./blog'));

module.exports = router;