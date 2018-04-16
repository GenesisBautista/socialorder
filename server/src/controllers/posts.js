const Posts = require('../models/posts');

module.exports = {

  // post manipulation
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
        res.status(200).send({id: newPost._id});
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
  },

  editPost (req, res, next) {
    var updatedPost = {
      _id: req.body._id,
      title: req.body.title,
      message: req.body.message,
      author: {
        _id: req.user._id,
        username: req.user.username
      }
    };
    Posts.editPost(updatedPost)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        switch (err.code) {
          default :
            res.status(400).send(err);
        }
      });
  },

  // post retrieval
  getPost (req, res, next) {
    Posts.getPost(req.params.id)
      .then((post) => {
        res.status(200).send(post);
      })
      .catch((err) => {
        res.status(404).send({error: err.message})
      });
  },

  getNewPosts (req, res, next) {
    Posts.getNewPosts(req.params.page)
      .then((posts) => {
        res.status(200).send(posts);
      })
      .catch((err) => {
        res.status(404).send({error: err.message});
      });
  }
}
