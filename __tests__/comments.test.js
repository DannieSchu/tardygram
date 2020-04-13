const { getUser, getPost, getAgent, getComment } = require('../db/data-helpers');

describe('comment routes', () => {
  it('creates a comment', async() => {
    const user = await getUser({ username: 'gnome' });
    const post = await getPost();

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

  it('deletes a comment', async() => {
    const user = await getUser({ username: 'gnome' });
    const comment = await getComment({ commentBy: user._id });

    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });
});
