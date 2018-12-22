var mongoose = require('mongoose');  
var commentSchema = new mongoose.Schema({  
  name: String,
  body: String
});
mongoose.model('Comment', commentSchema);

module.exports = mongoose.model('Comment');