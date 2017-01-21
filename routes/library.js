var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var User = require('../models/userModel');

router.get('/', function(req, res){
  console.log('hit lib get');

  var libInfo = {
    libTechnology: req.user.libTechnology,
  };
  res.send(libInfo);
});//end get /


router.post('/addTech', function(req, res){
  console.log('hit entries get');
  var user_id = req.user._id;
  var newCategory = {
    name: req.body.tech,
    subCategory: []
  };
  
  console.log('user_id/newCategory -> ', user_id, newCategory);

  User.update(
      { "_id": user_id },
      { "$push": { "libTechnology": newCategory } },
      function(err,numAffected) {
        console.log('tech add success -> ', numAffected);
        res.sendStatus(201);
      }); // end update
});//end post /


module.exports = router;
