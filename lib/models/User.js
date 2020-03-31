const mongoose = require('mongoose');
const { hashSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists']
  },
  passwordHash: {
    type: String,
    required: true
  },
  profilePhotoURL: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

// use virtual to hash password so that plain text password is not stored in model
schema.virtual('password').set(function(password) {
  // hash password with bcrypt
  const hash = hashSync(password, 14);
  // set passwordHash of User model to hashed password
  this.passwordHash = hash;
});

// create a session token for signup and login
schema.methods.authToken = function() {
  // use JWT to create a token for user
  const token = sign({ payload: this.toJSON() }, process.env.APP_SECRET, { 
    expiresIn: '24h'
  });
  return token;
};

module.exports = mongoose.model('User', schema);
