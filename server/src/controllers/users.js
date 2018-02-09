const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtCreateToken (user) {
  return jwt.sign(user, config.jwt.secret, {
    expiresIn: config.jwt.expiration
  });
}

module.exports = {

  // register new user
  register (req, res, next) {
    Users.createUser(req.body)
      .then((newUser) => {
        let user = {
          _id: newUser._id,
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          joined: newUser.joined
        };

        return res.send({
          user: user,
          token: jwtCreateToken(user)
        });
      })
      .catch((err) => {
        switch (err.code) {
          case 11000:
            res.status(400).send({
              error: 'Username or email already used'
            });
            break;
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

  // login
  login (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    var possibleUser = null;

    Users.findByEmail(email)
      .then((user) => {
        if (!user) {
          res.status(400).send({
            error: 'No account found'
          });
        }
        possibleUser = user;
        return {candidate: password, hash: user.password};
      })
      .then(Users.comparePassword)
      .then((result) => {
        if (result) {
          let user = {
            _id: possibleUser._id,
            username: possibleUser.username,
            firstName: possibleUser.firstName,
            lastName: possibleUser.lastName,
            email: possibleUser.email,
            joined: possibleUser.joined
          };

          return res.send({
            user: user,
            token: jwtCreateToken(user)
          });
        } else {
          return res.status(400).send({
            error: 'Incorrect Password'
          });
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  }
}
