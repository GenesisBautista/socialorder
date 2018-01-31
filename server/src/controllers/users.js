const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtCreateToken (user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800
  })
}

module.exports = {

  // register new user
  register (req, res, next) {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }
    let newUser = new Users(user)
    Users.addUser(newUser, (err, user) => {
      if (err) {
        switch (err.code) {
          case 11000:
            res.status(400).send({
              error: 'Email already registered'
            })
            break
          case 11601:
            res.status(400).send({
              error: 'Lost connection to server'
            })
            break
          default :
            res.status(400).send({
              error: 'Server not available'
            })
        }
      } else {
        Users.getUserByEmail(user.email, (err, user) => {
          if (err) {
            res.status(500).send({ error: 'How did you get here?' })
          } else {
            delete user.password
            res.send({
              user: user.toJSON(),
              token: jwtCreateToken(user.toJSON())
            })
          }
        })
      }
    })
  },

  // login
  login (req, res, next) {
    const email = req.body.email
    const password = req.body.password

    Users.getUserByEmail(email, (err, user) => {
      if (err || !user) {
        return res.status(404).send({
          error: 'Email not found'
        })
      }

      Users.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          res.send({
            user: user.toJSON(),
            token: jwtCreateToken(user.toJSON())
          })
        } else {
          return res.status(401).send({error: 'Wrong password'})
        }
      })
    })
  }
}
