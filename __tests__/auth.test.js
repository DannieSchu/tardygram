require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'newgnome',
        password: 'feelinggnomey',
        profilePhotoURL: 'https://unsplash.com/photos/TZyEMoSB9Tw'   
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'newgnome',
          profilePhotoURL: 'https://unsplash.com/photos/TZyEMoSB9Tw',
          __v: 0   
        });
      });
  });
});
