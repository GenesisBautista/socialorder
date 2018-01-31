const express = require('express')
const router = express.Router()
const passport = require('passport')

const controller = require('../controllers/users')

// register
router.post(
  '/register',
  controller.register
)

// authenticate
router.post(
  '/authenticate',
  controller.authenticate
)

// profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user})
})

module.exports = router
