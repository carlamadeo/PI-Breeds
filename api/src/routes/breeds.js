const { Router } = require('express');
const { getBreeds, getBreedDetail, createBreed, deleteBreed } = require('../controllers/breeds');

const router = Router();

//router.get('/', getDbBreeds);

router.get('/', getBreeds);

router.get('/:breedId', getBreedDetail);

router.post('/', createBreed);

router.delete('/:breedId', deleteBreed);

module.exports = router;
