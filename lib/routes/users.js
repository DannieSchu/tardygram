const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .get('/prolific', (req, res, next) => {
    User 
      .mostProlific()
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/leader', (req, res, next) => {
    User
      .mostComments()
      .then(users => res.send(users))
      .catch(next);
  });
