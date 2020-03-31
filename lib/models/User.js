const mongoose = require('mongoose');
const { hashSync } = require('bcryptjs');

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
});

// user virtual to hash password so that plain text password is not stored in model
schema.virtual('password').set(function(password) {
  // hash password with bcrypt
  const hash = hashSync(password, 14);
  // set passwordHash of User model to hashed password
  this.passwordHash = hash;
});

module.exports = mongoose.model('User', schema);
