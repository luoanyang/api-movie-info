var express = require('express');
var router = express.Router();


router.get('/', (req,res,next)=>{
	res.rend(index);
});

module.exports = router;
