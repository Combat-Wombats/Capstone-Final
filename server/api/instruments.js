const express = require ('express');
const db = require ('../db');
//const router = require('./auth');
const router = express.Router();
const { getstrings } = require('../db/index')

// /api/instruments
router.get('/strings', async(req, res, next)=>{
    try {
        const strings = await getstrings();
        res.send(strings);
        console.log("A request is being made to strings");
   } catch (error) {
    next(error);
   }
})

// POST /api/instruments/strings

// PATCH /api/instruments/strings

module.exports = router;