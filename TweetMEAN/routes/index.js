var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	//console.log("request is " + req.user.username);
	res.render('index', { title: "Chirp"});
});

module.exports = router;