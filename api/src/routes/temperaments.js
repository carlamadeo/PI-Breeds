const { Router } = require('express');
const router = Router();
const { getTemperaments } = require('../controllers/temperaments')

router.get('/', getTemperaments);

module.exports = router;