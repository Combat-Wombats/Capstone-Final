const express = require('express');
const router = express.Router();
//current route /api

// const instrumentsRouter = require('/instruments/strings');
// router.use('/instruments', instrumentsRouter);

// ROUTER: /api/instruments/strings
// const stringsRouter = require('../instruments/strings');
// router.use('/strings', stringsRouter);

//ROUTER; /API/users
const userRouter = require('./users');
router.use('/users', userRouter);

module.exports = router;