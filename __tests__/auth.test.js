const { getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'eatinggnome',
        password: 'feelinggnomey',
        profilePhotoURL: 'https://unsplash.com/photos/TZyEMoSB9Tw'   
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'eatinggnome',
          profilePhotoURL: 'https://unsplash.com/photos/TZyEMoSB9Tw',
          __v: 0   
        });
      });
  });

  it('logs in a user', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'gnome',
        password: 'feelinggnomey',
        profilePhotoURL: 'https://unsplash.com/photos/TZyEMoSB9Tw'   
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'gnome',
          profilePhotoURL: 'https://unsplash.com/photos/TZyEMoSB9Tw',
          __v: 0   
        });
      });
  });

  it('returns an error if user enters incorrect password', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'gnome',
        password: 'feelingUNgnomey',
        profilePhotoURL: 'https://unsplash.com/photos/TZyEMoSB9Tw'   
      })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid username or password',
          status: 401
        });
      });
  });

  it('verifies the user who is logged in', () => {
    return getAgent()
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'gnome',
          profilePhotoURL: 'https://unsplash.com/photos/TZyEMoSB9Tw',
          __v: 0   
        });
      });
  });
});

