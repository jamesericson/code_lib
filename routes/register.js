var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/userModel');

router.get('/', function(req, res) {
  var regPath = path.join(__dirname, '../public/views/register.html');
  res.sendFile(regPath);
});

// post to create a new user
router.post('/', function(req, res) {
  console.log('hit the post (ouch!), req.body-> ', req.body);
  var data = req.body;

  var newUser = new User({
    email: data.email,
    name: { first_name: data.first_name,
            last_name: data.last_name },
    password: data.password,
    following: [ ],
    libTechnology: [  ]
  });

  newUser.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else {
      console.log('new user was registered');
      res.sendStatus(201);
    }// end if else
  }); // end save
}); //end post /

module.exports = router;
