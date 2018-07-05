const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    if (req.body.username == '13940640653' && req.body.password == '123456') {
        return res.json({
            status: '0',
            data: { nickName: '管理员', code: '345' }
        })
    }
    res.json({
        status: '01'
    })
});


module.exports = router;