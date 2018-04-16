const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts');
const authenticate = require('../policies/authenticate');
const policies = require('../policies/posts');

// submit new post
router.post(
  '/',
  authenticate.authenticate,
  policies.post,
  controller.post
);

// view multiple posts
router.get(
  '/view/:page',
  controller.getNewPosts
);

// view post
router.get(
  '/:id',
  controller.getPost
);

// edit post
router.post(
  '/edit',
  authenticate.authenticate,
  policies.post,
  controller.editPost
)

module.exports = router;
