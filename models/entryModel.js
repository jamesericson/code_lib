var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema ({
  name: String,
  syntax: String,
  gitHub: String,
  resourceOne: String,
  resourceTwo: String,
  resourceThree: String,
  notes: String
});

var CodeEntry = mongoose.model('entries', entrySchema);

module.exports = CodeEntry;
