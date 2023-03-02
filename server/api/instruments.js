const express = require ('express');
const db = require ('../db');
//const router = require('./auth');
const router = express.Router();
const { getstrings } = require('../db/index');
const { getProducts } = require('../db/products');

// /api/instruments
router.get('/', async (req, res, next)=> {
    try {
        const allProducts = await getProducts();
        res.send(allProducts);
    } catch (error) {
        next(error)
    }
})

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