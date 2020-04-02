const { Router } = require('express');
const Post = require('../models/Post');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Post
      .create({ ...req.body, user: req.user._id })
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Post
      .find()
      .then(posts => res.send(posts))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Post  
      .findById(req.params.id)
      .populate('user')
      .populate({
        path: 'comments',
        select: 'commentBy post comment',
        populate: {
          path: 'commentBy',
          select: 'username'
        }
      })
      .then(post => res.send(post))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Post
      .findOneAndUpdate({
        _id: req.params.id,
        user: req.user._id
      }, { caption: req.body.caption }, { new: true })
      .then(post => res.send(post))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Post
      .findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      })
      .then(post => res.send(post))
      .catch(next);
  });
