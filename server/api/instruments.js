const express = require('express');
const db = require('../db');
//const router = require('./auth');
const router = express.Router();
const { getstrings } = require('../db/index');
const { getProducts, getProductById } = require('../db/products');
const { getCartByUserId } = require('../db/Cart')

// /api/instruments
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await getProducts();
    res.send(allProducts);
  } catch (error) {
    next(error);
  }
});


// /api/instruments/strings/:id
router.get('/strings/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const strings = await getProductById(id);
    res.send(strings);
  } catch (error) {
    next(error);
  }
});

// router.get('/brass/:id', async(req, res, next) => {
//     try {
//         const {id} = req.params;
//         const brass = await getProductById(id);
//         res.send(brass)
//     } catch (error) {
//         next(errpr)
        
//     }
// });
// ^^^^^ ADAM: api call for a single product view by id test --> (http://localhost:3000/api/instruments/strings/1)

// /api/instruments/strings/:id
// router.get('/strings/:id', async (req, res)=>{
//     const { userId } = req. params;
//     const cart = await getCartByUserId({ userId });
//     res.send(cart);
// })

// post
router.post('/carts/:productId', async (req, res) => {
    const { productId } = req.params;
    const user = await getUserByToken(req.headers.authorization);
    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const cart = await getCartByUserId({ userId: user.id });
    await addProductToCart({ cartId: cart.id, productId });
    const updatedCart = await getCartByUserId({ userId: user.id });
    res.send(updatedCart);
  });
  
module.exports = router;
