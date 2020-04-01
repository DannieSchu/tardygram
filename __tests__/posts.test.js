const { getUser, getAgent } = require('../db/data-helpers');

describe('posts routes', () => {
  it('creates a post', async() => {
    const user = await getUser({ username: 'gnome' });
    
    return getAgent()
      .post('/api/v1/posts')
      .send({
        photoURL: 'https://www.gardendesign.com/pictures/images/650x490Exact/site_3/terra-cotta-planter-wall-proven-winners_14534.jpg',
        caption: 'So many garden nooks to hide in!',
        tags: ['garden', 'inspired']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          photoURL: 'https://www.gardendesign.com/pictures/images/650x490Exact/site_3/terra-cotta-planter-wall-proven-winners_14534.jpg',
          caption: 'So many garden nooks to hide in!',
          tags: ['garden', 'inspired'],
          __v: 0
        });
      });
  });
});
