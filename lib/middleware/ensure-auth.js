const User = require('../models/User');

module.exports = (req, res, next) => {
  // read the session cookie
  const token = req.cookies.session;
  // find the user by their token
  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    });
};
