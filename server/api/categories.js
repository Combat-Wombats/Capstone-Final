const express = require ('express');
const db = require ('../db');

const router = express.Router();
const { getCategories } = require('../db/index');

// /api/categories
router.get('/', async (req, res, next)=> {
    try {
        console.log('fetching categories')
        const allCategories = await getCategories();
        res.send(allCategories);
    } catch (error) {
        next(error)
    }
})





module.exports = router;