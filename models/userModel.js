var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;
var EntrySchema = require('../models/entryModel').schema;

var UserSchema = new Schema({
  email: { type:String, lowercase:true, unique: true },
  name: { first_name: { type:String, lowercase:true },
          last_name: { type:String, lowercase:true }
        },
  password: String,
  following: [ Number ],
  libTechnology: [
                  { name: {type:String},
                    subCategory:
                                [
                                 { name: {type:String},
                                   entries: [ EntrySchema ]
                                 }
                               ]
                  }
                 ]
});

// Must encrypt, salt and hash the password
UserSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {

        // change the password to the hash
        user.password = hash;
        next();
      });
  });
});

// compare passwords
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err ? callback(err) : callback(null, isMatch)); // null - no error, and matched true/false
  });
};

var User = mongoose.model('users', UserSchema);
module.exports = User;
