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


router.delete( '/:code', function(req, res){
  console.log('hit codeEntery delete, req.params.id -> ', req.params.code);
  var code_id = req.params.code;
  var user_id = req.user._id;

  User.findOne(
    {'_id': user_id}, function( err, result) {
      var destination = result;

      var techArray = result.libTechnology;
      for (var i = 0; i < techArray.length; i++) {
        // console.log(techArray[i].name);
        var subArray = techArray[i].subCategory;
        for (var ii = 0; ii < subArray.length; ii++) {
          // console.log(subArray[ii].name);
          var entryArray = subArray[ii].entries;
          for (var iii = 0; iii < entryArray.length; iii++) {
            // console.log(entryArray[iii]._id, code_id);
            if (entryArray[iii]._id == code_id){
              var libIndex = i;
              var subIndex = ii;
              var codeIndex = iii;
            } // end if
          } // end nested nested for --- never again, gross
        } // end nested for
      } // end nested
      destination.libTechnology[libIndex].subCategory[subIndex].entries.splice(codeIndex, 1);
      destination.save(function(err, entryResult) {
          if(err){
            console.log(err);
            res.sendStatus(500);
          }else {
            console.log('deleted entry')
            res.sendStatus(201);
          } // end if else
      }); // end save
  }); // end findOne
});//end delete /

module.exports = router;
