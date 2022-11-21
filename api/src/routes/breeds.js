const { Router } = require('express');
const { getBreeds, getBreedDetail, createBreed } = require('../controllers/breeds');

const router = Router();

//router.get('/', getDbBreeds);

router.get('/', getBreeds);

router.get('/:breedId', getBreedDetail);

router.post('/', createBreed);

module.exports = router;
