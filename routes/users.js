var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/', function(req, res){
  console.log('hit user get');

  var userInfo = {
    first_name: req.user.name.first_name,
    last_name: req.user.name.last_name,
    libTechnology: req.user.libTechnology
  };
  res.send(userInfo);
});//end get /

router.get('/logout', function(req, res){
  console.log('hit logout get');

  req.logout();
  res.sendStatus(200);
})

module.exports = router;
