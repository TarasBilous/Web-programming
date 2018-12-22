var mongoose = require('mongoose');  
var newsSchema = new mongoose.Schema({  
  title: String,
  text: String,
  image: String
});
mongoose.model('News', newsSchema);

module.exports = mongoose.model('News');