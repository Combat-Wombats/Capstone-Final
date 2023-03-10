const express = require('express');
const db = require('../db');
//const router = require('./auth');
const router = express.Router();
const { getstrings } = require('../db/index');
const { getProducts } = require('../db/products');
const { getProductById } = require('../db/products');

// /api/instruments
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await getProducts();
    res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

// /api/instruments/strings
router.get('/strings', async (req, res, next) => {
  try {
    const allStrings = await getstrings();
    res.send(allStrings);
  } catch (error) {
    next(error);
  }
});

// /api/instruments/strings/:id
router.get('/strings/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const string = await getProductById(id);
    res.send(string);
  } catch (error) {
    next(error);
  }
});

// ^^^^^ ADAM: api call for a single product view by id test --> (http://localhost:3000/api/instruments/strings/1)

// POST /api/instruments/strings

// PATCH /api/instruments/strings

module.exports = router;
