const { getUser, getAgent, getPost, getPosts, getComments } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

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

  it('gets all posts', async() => {
    const posts = await getPosts();

    return request(app)
      .get('/api/v1/posts')
      .then(res => {
        expect(res.body).toEqual(posts);
      });
  });

  it('gets a post by its id', async() => {
    const post = await getPost();
    const user = await getUser({ _id: post.user });
    const comments = await getComments({ post: post._id });

    return request(app)
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          comments: comments.map(comment => ({
            _id: comment._id,
            post: comment.post,
            comment: comment.comment,
            commentBy: {
              _id: comment.commentBy,
              username: expect.any(String)
            }
          })),
          user
        });
      });
  });

  it('updates a post', async() => {
    const user = await getUser({ username: 'gnome' });
    const post = await getPost({ user: user._id });

    return getAgent()
      .patch(`/api/v1/posts/${post._id}`)
      .send({ caption: 'Some new caption' })
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          caption: 'Some new caption'
        });
      });
  });

  it('deletes a post', async() => {
    const user = await getUser({ username: 'gnome' });
    const post = await getPost({ user: user._id });

    return getAgent()
      .delete(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual(post);
      });
  });
});
