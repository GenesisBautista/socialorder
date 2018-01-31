const Joi = require('joi')
const passport = require('passport')

module.exports = {

  // register
  register (req, res, next) {
    const schema = {
      firstName: Joi.string().max(20),
      lastName: Joi.string().max(20),
      email: Joi.string().email(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/)
    }

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'firstName':
          res.status(400).send({
            error: 'Your name is too long'
          })
          break
        case 'lastName':
          res.status(400).send({
            error: 'Your name is too long'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must provide a real email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Password must be at 5-30 characters containing only letters and numbers'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration'
          })
      }
    } else {
      next()
    }
  },

  // authenticate
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
