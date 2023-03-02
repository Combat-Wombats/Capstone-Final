const express = require ('express');
const db = require ('../db');
const router = require('./auth');
const router = express.Router();

// GET /api/instruments/strings
router.get('../instruments/strings', async(req, res, next)=>{
   try {
    const brass = await getstrings();
   } catch (error) {
    
   }
})

// POST /api/instruments/strings

// PATCH /api/instruments/strings