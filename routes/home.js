var express = require('express');
var path = require('path');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
  var homePath = path.join(__dirname, '../public/views/home.html');
  // console.log('req.user', req.user);
  console.log('is authed?', req.isAuthenticated());
  if ( req.isAuthenticated() ){
    res.sendFile(homePath);
  } else {
    res.sendStatus(404);
  }// end if else
});

router.post('/', passport.authenticate('local'), function(req, res) {
  res.sendStatus(200);
});

module.exports = router;
