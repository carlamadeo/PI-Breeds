/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');

const agent = session(app);
const breed = {
  name: 'Pug',
  min_height: 10,
  max_height: 15,
  min_weight: 2,
  max_weight: 5,
  min_life_span: 6,
  max_life_span: 7,
  temperaments: [5]
};

describe('Breed routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Breed.sync({ force: true })
    .then(() => Breed.create(breed)));
  describe('GET /dogs', () => {
    it('Should receive a 200 status', (done) => {
      agent.get('/dogs').expect(200).then(done())
    }
    );
  });
  describe('POST /dogs', () => {
    it('responds with 201', (done) => {
      agent.post('/dogs').send(breed).expect(201).then(done())
    });
  });

});

