const express = require('express');
const router = express.Router();

const instrumentsRouter = require('/instruments/strings');
router.use('/instruments', instrumentsRouter);

// ROUTER: /api/instruments/strings
const stringsRouter = require('../instruments/strings');
router.use('/strings', stringsRouter);


module.exports = router;