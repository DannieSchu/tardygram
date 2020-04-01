const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

module.exports = async({ usersToCreate = 5, postsToCreate = 20 } = {}) => {
  const loggedInUser = await User.create({
    username: 'gnome',
    password: 'feelinggnomey',
    profilePhotoURL: 'https://unsplash.com/photos/TZyEMoSB9Tw'   
  });

  const tagOptions = ['cheerful', 'inspiring', 'gnomey', 'odd', 'Oregon', 'garden'];

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.animal(),
    password: chance.word(),
    profilePhotoURL: chance.avatar({ fileExtension: 'jpg' })
  })));

  await Post.create([...Array(postsToCreate)].map(() => ({
    user: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id,
    photoURL: chance.avatar({ fileExtension: 'jpg' }),
    caption: chance.sentence(),
    tags: chance.pickset(tagOptions, 3)
  })));
};
