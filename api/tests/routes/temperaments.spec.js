const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Temperaments, conn } = require('../../src/db.js');

const agent = session(app);

describe('Temperaments routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('GET /temperaments', () => {
    it('Should receive a 200 status', () =>
      agent.get('/temperaments').expect(200)
    );
  });
});
