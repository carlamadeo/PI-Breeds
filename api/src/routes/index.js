const { Router } = require('express');
const breedsRoutes = require('./breeds.js');
const temperamentsRoutes = require('./temperaments.js');

const router = Router();

router.use('/dogs', breedsRoutes);
router.use('/temperaments', temperamentsRoutes);


module.exports = router;
