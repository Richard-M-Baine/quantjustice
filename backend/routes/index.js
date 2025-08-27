const express = require('express');
const router = express.Router();
const countyRoutes = require('./county/index.js'); // Path relative to this file
const crimeRoutes = require('./crimes/index.js');
const judgeRoutes = require('./judges/index.js');

router.use('/county', countyRoutes);
router.use('/crimes', crimeRoutes);
router.use('/judges', judgeRoutes);

module.exports = router;