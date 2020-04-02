const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photoURL: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  tags: [String]
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

module.exports = mongoose.model('Post', schema);
