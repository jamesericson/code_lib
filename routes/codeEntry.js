var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var User = require('../models/userModel');
var CodeEntry = require( '../models/entryModel' );

router.post('/', function(req, res){
  console.log('hit codeEntery post');
  var user_id = req.user._id;
  var data = req.body;
  var techId = data.techCategory;
  var subId = data.subCategory;
  var newEntry = new CodeEntry({
    name: data.name,
    syntax: data.syntax,
    gitHub: data.gitHub,
    resourceOne: data.resourceOne,
    resourceTwo: data.resourceTwo,
    resourceThree: data.resourceThree,
    notes: data.notes
  }); // end newEntry

  User.findOne( {_id: user_id} , function(err, result) {
      var destination = result;
      destination.libTechnology.id(techId).subCategory.id(subId).entries.push(newEntry);
      destination.save(function(err, entryResult) {
          if(err){
            console.log(err);
            res.sendStatus(500);
          }else {
            console.log('push worked', entryResult)
            res.sendStatus(201);
          } // end if else
      }); // end save
  }); // end findOne

});//end post /


module.exports = router;
