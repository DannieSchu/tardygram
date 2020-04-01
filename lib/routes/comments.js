const { Router } = require('express');
const Comment = require('../models/Comment');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    console.log(req.body); // not getting this
    Comment
      .create({ ...req.body, commentBy: req.user._id })
      .then(comment => res.send(comment))
      .catch(next);
  });
