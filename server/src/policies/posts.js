const Joi = require('joi');

module.exports = {
  post (req, res, next) {
    const schema = {
      title: Joi.string().required(),
      message: Joi.string().required()
    };

    var postInfo = {
      title: req.body.title,
      message: req.body.message
    };

    const {error} = Joi.validate(postInfo, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case 'title':
          res.status(500).send({
            error: 'Posts needs titles'
          });
          break;
        default:
          res.status(400).send({
            error: 'Invalid post'
          });
      }
    } else {
      next();
    }
  },

  reply (req, res, next) {
    const schema = {
      title: Joi.string(),
      message: Joi.string().required()
    };

    const {error} = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        default:
          res.status(400).send({
            error: 'Invalid post'
          });
      }
    } else {
      next();
    }
  }
}
