var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
res.render('error2');});


module.exports = router;
