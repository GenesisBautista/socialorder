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

// view post
router.get(
  '/view'
);

module.exports = router;
