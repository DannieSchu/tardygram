const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const handleAuthorization = (res, user) => {
  res.cookie('session', user.authToken(), {
    maxAge: ONE_DAY_IN_MS,
    httpOnly: true
  });
  res.send(user);
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      // create a new user; hash password with virtual
      .create(req.body)
      // send user and JWT
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    User
      // check user's username and password
      .authorize(req.body)
      // send user and JWT
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });

