const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtCreateToken (user) {
  return jwt.sign(user, config.jwt.secret, {
    expiresIn: config.jwt.expiration
  });
}

module.exports = {

  // register
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

        return res.status(200).send({
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
        possibleUser = user;
        return {candidate: password, hash: user.password};
      })
      .then(Users.comparePassword)
      .then(() => {
        let user = {
          _id: possibleUser._id,
          username: possibleUser.username,
          firstName: possibleUser.firstName,
          lastName: possibleUser.lastName,
          email: possibleUser.email,
          joined: possibleUser.joined
        };
        return res.status(200).send({
          user: user,
          token: jwtCreateToken(user)
        });
      })
      .catch((err) => {
        res.status(400).send({error: err.message});
      })
  }
}
