const { getUser, getPost, getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('comment routes', () => {
  it('creates a comment', async() => {
    const user = await getUser({ username: 'gnome' });
    const post = await getPost();

    // console.log(user)
    return getAgent()
      .post('/api/v1/comments')
      .send({
        post: post._id,
        comment: 'Let me join you in the gnome garden!'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          commentBy: user._id,
          post: post._id,
          comment: 'Let me join you in the gnome garden!',
          __v: 0
        });
      });
  });
});
