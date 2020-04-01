const { Router } = require('express');
const User = require('../models/User');

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
      .then(user => handleAuthorization(res, user))
      .catch(next);
  });
