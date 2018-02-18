const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts');
const policy = require('../policies/users');

// submit new post
router.post(
  '/post',
  policy.register,
  controller.register
);

// reply to post
router.post(
  '/reply'
);

// view post
router.post(
  '/view'
);

module.exports = router;
