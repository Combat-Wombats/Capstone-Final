const express = require('express');
const router = express.Router();
//current route /api

//ROUTER; /API/users
const userRouter = require('./users');
router.use('/users', userRouter);

module.exports = router;