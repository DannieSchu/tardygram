const chance = require('chance').Chance();
const User = require('../lib/models/User');

module.exports = async({ usersToCreate = 5 } = {}) => {
  await User.create({
    username: 'gnome',
    password: 'feelinggnomey',
    profilePhotoURL: 'https://unsplash.com/photos/TZyEMoSB9Tw'   
  });

  await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.animal(),
    password: chance.word(),
    profilePhotoURL: chance.avatar({ fileExtension: 'jpg' })
  })));
};
