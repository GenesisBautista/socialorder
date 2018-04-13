const Posts = require('../models/posts');

module.exports = {

  // post
  post (req, res, next) {
    var newPost = {
      title: req.body.title,
      message: req.body.message,
      author: {
        _id: req.user._id,
        username: req.user.username
      }
    };
    Posts.submitPost(newPost)
      .then((newPost) => {
        res.status(200).send({url: newPost.url});
      })
      .catch((err) => {
        switch (err.code) {
          case 11601:
            res.status(400).send({
              error: 'Lost connection to server'
            });
            break;
          default :
            res.status(400).send(err);
        }
      });
  }
}
