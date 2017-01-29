var express = require('express');
var path = require('path');
var passport = require('passport');
var router = express.Router();

function lookIHitThePost(req, res, next) {
    console.log('Hit the post!');
    next();
}
router.get('/', function(req, res) {
  var indexPath = path.join(__dirname, '../public/views/index.html');
  res.sendFile(indexPath);
});

router.post('/', lookIHitThePost, passport.authenticate('local'), function(req, res) {
    res.sendStatus(200);
});

module.exports = router;
