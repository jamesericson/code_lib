var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var User = require('../models/userModel');


router.post('/', function(req, res){
  console.log('hit sub post');
  var user_id = req.user._id;
  var techId = req.body.techId;
  var newCategory = {
    name: req.body.sub,
    entries: []
  };
  User.findOne(
      { "_id": user_id }
  ).exec(
      function(err, result){
          result.libTechnology.id(techId).subCategory.push(newCategory)
          result.save(function(err){
              console.log('Sub add success')
              res.sendStatus(201);
          }); // end result.save func
      }); // end findOne/exec
});//end post /


module.exports = router;
