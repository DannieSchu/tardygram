const request = require('supertest');
const app = require('../lib/app');
require('../db/data-helpers');

describe('users routes', () => {
  it('gets 10 users with the most posts', () => {
    return request(app)
      .get('/api/v1/users/prolific')
      .then(res => {
        expect(res.body.length).toEqual(10);
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          username: expect.any(String),
          totalPosts: expect.any(Number)
        });
      });
  });

  it('gets 10 users with the most comments', () => {
    return request(app)
      .get('/api/v1/users/leaders')
      .then(res => {
        expect(res.body.length).toEqual(10);
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          username: expect.any(String),
          totalComments: expect.any(Number)
        });  
      });   
  });
});
