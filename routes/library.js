var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/', function(req, res){
  console.log('hit entries get');

  var libInfo = {
    libTechnology: req.user.libTechnology,
  };
  res.send(libInfo);
});//end get /

module.exports = router;
