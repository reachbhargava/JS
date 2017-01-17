var mongoose = require('mongoose')

// In general DB world, there is one schema and under them tables,
// Here it more looks like creation of tables is using mongoose.Schema
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  created_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
  text: String,
  username: String,
  created_at: {type: Date, default: Date.now}
});

// This is called Synthesizing the Schema
mongoose.model('User', userSchema);
mongoose.model('Post', postSchema);