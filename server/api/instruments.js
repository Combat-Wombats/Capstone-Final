const express = require ('express').Router();
const db = require ('../db');
const router = require('./auth');

router.get('../instruments/brass', async(req, res, next)=>{
   try {
    const brass = await brass();
   } catch (error) {
    
   }
})