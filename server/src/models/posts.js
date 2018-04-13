const mongoose = require('mongoose');
const crypto = require('crypto');

var ObjectId = mongoose.Schema.Types.ObjectId;

var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  url: {
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

function generateURL (username, date, title) {
  console.log(username + date + title);
  return crypto.createHash('md5').update(username + date + title).digest('hex');
}

module.exports.submitPost = (post) => new Promise((resolve, reject) => {
  const parse = {
    ...post,
    url: generateURL(post.author._id, Date.now().toString(), post.title)
  }
  var newPost = new Post(parse);
  newPost.save(function (err) {
    if (err) return reject(err);
    resolve(newPost);
  });
});

module.exports.getPost = (url) => new Promise((resolve, reject) => {
  const query = {url: url};
  Post.findOne(query, (err, post) => {
    if (err) return reject(err);
    else post ? resolve(post) : reject(new Error('Post not found'));
  });
});
