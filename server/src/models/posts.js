const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  dateSubmitted: {
    type: Date,
    required: true
  },
  dateEditted: {
    type: Date
  }
})

var Post = module.exports = mongoose.model('Users', postSchema);

module.exports.submitPost = (post) => new Promise((resolve, reject) => {
  var newPost = new Post(post)
  newPost.save(function (err) {
    if (err) return reject(err);
    resolve(newPost);
  });
})
