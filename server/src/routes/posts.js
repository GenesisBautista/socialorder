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

router.get(
  '/view/:page',
  controller.getNewPosts
);

// view post
router.get(
  '/:id',
  controller.getPost
);

router.post(
  '/edit'
)

module.exports = router;
