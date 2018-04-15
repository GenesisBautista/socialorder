const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  dateSubmitted: {
    type: Date,
    default: Date.now
  },
  dateEditted: {
    type: Date
  },
  isReply: {
    type: Boolean,
    required: true,
    default: false
  },
  author: {
    _id: {
      type: ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  }
});

var Post = module.exports = mongoose.model('Post', postSchema);

module.exports.submitPost = (post) => new Promise((resolve, reject) => {
  const parse = {
    ...post
  }
  var newPost = new Post(parse);
  newPost.save(function (err) {
    if (err) return reject(err);
    resolve(newPost);
  });
});

module.exports.getPost = (id) => new Promise((resolve, reject) => {
  const query = {_id: id};
  Post.findOne(query, (err, post) => {
    if (err) return reject(err);
    else post ? resolve(post) : reject(new Error('Post not found'));
  });
});

module.exports.getNewPosts = (page) => new Promise((resolve, reject) => {
  var skip = (page - 1) * 10;
  Post.find().limit(10).skip(skip).sort('-dateSubmitted').exec((err, posts) => {
    if (err) return reject(err);
    else posts ? resolve(posts) : reject(new Error('No Posts Exists'));
  });
});
