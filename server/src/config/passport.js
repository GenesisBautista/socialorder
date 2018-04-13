const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const config = require('../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
}

passport.use(
  new JwtStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload._id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

module.exports = null;
