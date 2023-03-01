const express = require ('express').Router();
const db = require ('../db');
const router = require('./auth');

// GET /api/brass
router.get('../instruments/brass', async(req, res, next)=>{
   try {
    const brass = await brass();
   } catch (error) {
    
   }
})