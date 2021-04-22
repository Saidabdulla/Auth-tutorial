const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');


router.get('/', verifyToken, (req, res) => {
    res.status(200).send(req.foydalanuvchi);
});

module.exports = router;