const express = require('express');
const router = express.Router();

// ROUTER: /api/instruments/strings
const stringsRouter = require('../instruments/strings');
router.use('/strings', stringsRouter);

// ROUTER: /api/instruments/brass
const brassRouter = require('../instruments/brass');
router.use('/brass', brassRouter);

// ROUTER: /api/instruments/woodwind
const woodwindRouter = require('../instruments/woodwind');
router.use('/woodwind', woodwindRouter);

// ROUTER: /api/instruments/drums
const drumsRouter = require('../instruments/drums');
router.use('/drums', drumsRouter);


module.exports = router;