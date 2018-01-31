const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  register (req, res, next) {
    let newUser = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    Users.addUser(newUser, (err, user) => {
      if (err) {
        res.json({
          success: false,
          code: err.code,
          full: err
        })
      } else {
        res.json({
          success: true,
          msg: 'User registered'
        })
      }
    })
  },

  authenticate (req, res, next) {
    const email = req.body.email
    const password = req.body.password
    Users.getUserByEmail(email, (err, user) => {
      if (err) throw err
      if (!user) {
        return res.json({success: false, msg: 'User not found'})
      }
      Users.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          const token = jwt.sign(user, config.secret, {
            expiresIn: 28800
          })
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          })
        } else {
          return res.json({success: false, msg: 'Wrong password'})
        }
      })
    })
  }
}
