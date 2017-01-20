var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/', function(req, res){
  console.log('hit user get');

  var userInfo = {
    first_name: req.user.name.first_name,
    last_name: req.user.name.last_name
  };
  res.send(userInfo);
});//end get /

module.exports = router;
