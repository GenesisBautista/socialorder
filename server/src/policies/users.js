const Joi = require('joi')
const passport = require('passport')

module.exports = {

  // register
  register (req, res, next) {
    const schema = {
      username: Joi.string().regex(/^[A-Za-z0-9_@./#&+-]{5,30}$/).required(),
      firstName: Joi.string().max(20),
      lastName: Joi.string().max(20),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[A-Za-z0-9_@./#&+-]{5,30}$/).required()
    }

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'Username can only have letters numbers and these characters _./@#&+- with no spaces'
          })
          break
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
