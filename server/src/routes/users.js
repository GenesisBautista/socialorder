const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const policy = require('../policies/users');

// register
router.post(
  '/register',
  policy.register,
  controller.register
);

// login
router.post(
  '/login',
  controller.login
);

router.get(
  '/profile/:username',
  controller.findUser
)

module.exports = router;
