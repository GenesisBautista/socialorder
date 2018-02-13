const passport = require('passport')

module.exports = {
  authenticate (req, res, next) {
    passport.authenticate('jwt', (err, user) => {
      if (err || !user) {
        res.status(403).send({
          error: 'Please sign in'
        })
      } else {
        req.user = user
        next()
      }
    })
  }
}
