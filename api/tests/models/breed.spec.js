const { Breed, conn } = require('../../src/db.js');
const { expect } = require('chai');

const breedNoName = {
  min_height: 10,
  max_height: 15,
  min_weight: 2,
  max_weight: 5,
  min_life_span: 6,
  max_life_span: 7,
  temperaments: [5]
};

const breedWithName = {
  name: 'Pug',
  min_height: 10,
  max_height: 15,
  min_weight: 2,
  max_weight: 5,
  min_life_span: 6,
  max_life_span: 7,
  temperaments: [5]
};

describe('Breed model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Breed.sync({ force: true }));

    describe('No Breeds on Database', function () {
      it('Should not have any breed', async function () {
        expect(await Breed.findAll()).to.have.length(0);
      });
    });

    describe('Create a new Breed on Database', function () {
      it('Should have 1 breed', function () {
        Breed.create(breedWithName)
          .then(function (res) {
            expect(res).to.have.length(1)
          })
      });
    });

    describe('Create a new Breed without name', () => {
      it('Should throw an error if name is null', (done) => {
        Breed.create(breedNoName)
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
    });

  });
});
