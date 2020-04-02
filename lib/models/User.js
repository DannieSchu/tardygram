const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  profilePhotoURL: String,
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.passwordHash;
    }
  }
});

schema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user'
});

// Return 10 users with most posts
schema.statics.mostProlific = function() {[
  {
    '$lookup': {
      'from': 'posts', 
      'localField': '_id', 
      'foreignField': 'user', 
      'as': 'posts'
    }
  }, {
    '$project': {
      '_id': true, 
      'username': true, 
      'totalPosts': {
        '$size': '$posts'
      }
    }
  }, {
    '$sort': {
      'totalPosts': -1
    }
  }, {
    '$limit': 10
  }
];
};

// use virtual to hash password so that plain text password is not stored in model
schema.virtual('password').set(function(password) {
  // hash password with bcrypt
  const hash = bcrypt.hashSync(password, 8);
  // set passwordHash of User model to hashed password
  this.passwordHash = hash;
});

// find user with entered username and password (for login)
schema.statics.authorize = async function({ email, password }) {
  // confirm that we have user with entered email (otherwise, throw error)
  const user = await this.findOne({ email });
  if(!user) {
    const error = new Error('Invalid username or password');
    error.status = 401;
    throw error;
  }
  // confirm that corresponding user has matching password (otherwise, throw error)
  const matchingPassword = await bcrypt.compare(password, user.passwordHash);
  if(!matchingPassword) {
    const error = new Error('Invalid username or password');
    error.status = 401;
    throw error;
  }
  // return user is both requirements are true
  return user;
};

// create a session token (for signup and login)
schema.methods.authToken = function() {
  // use JWT to create a token for user
  const token = jwt.sign({ payload: this.toJSON() }, process.env.APP_SECRET, { 
    expiresIn: '24h'
  });
  return token;
};

// find a user by their token (for ensureAuth)
schema.statics.findByToken = function(token) {
  try {
    // take in a token
    const { payload } = jwt.verify(token, process.env.APP_SECRET);
    // return user who owns the token (use hydrate to turn plain JS object into mongoose doc)
    return Promise.resolve(this.hydrate(payload));
  } catch(e) {
    return Promise.reject(e);
  }
};

module.exports = mongoose.model('User', schema);
