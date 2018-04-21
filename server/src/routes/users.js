const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const authenticate = require('../policies/authenticate');
const policy = require('../policies/users');

// register
router.post(
  '/register',
  policy.user,
  controller.register
);

// login
router.post(
  '/login',
  controller.login
);

// view profile
router.get(
  '/profile/:username',
  controller.findUser
)

// update user data
router.post(
  '/update',
  authenticate.authenticate,
  policy.user,
  controller.updateUser
)

module.exports = router;
