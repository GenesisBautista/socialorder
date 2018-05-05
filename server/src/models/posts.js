const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: () => {
      return this.replyTo != null
    }
  },
  message: {
    type: String,
    required: true
  },
  dateSubmitted: {
    type: Date,
    default: Date.now
  },
  dateEditted: {
    type: Date
  },
  replyTo: {
    type: ObjectId,
    required: true,
    default: null
  },
  tags: [{
    _id: {
      type: ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    agree: {
      type: Number,
      required: true,
      default: 0
    },
    disagree: {
      type: Number,
      required: true,
      default: 0
    }
  }],
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

module.exports.getPostByPage = (page) => new Promise((resolve, reject) => {
  var skip = (page - 1) * 10;
  Post.find().limit(10).skip(skip).sort('-dateSubmitted').exec((err, posts) => {
    if (err) return reject(err);
    else posts ? resolve(posts) : reject(new Error('No Posts Exists'));
  });
});

module.exports.editPost = (post) => new Promise((resolve, reject) => {
  var query = {'_id': post._id};
  delete post['_id'];
  post.dateEditted = Date.now();
  Post.findOneAndUpdate(query, {$set: post}, {rawResult: true}, (err, result) => {
    if (err) return reject(err);
    else result ? resolve(result) : reject(new Error('Could not update post'));
  })
});
