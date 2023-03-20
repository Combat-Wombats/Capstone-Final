const express = require('express');
const db = require('../db');
//const router = require('./auth');
const router = express.Router();
const { getstrings } = require('../db/index');
const { getProducts, getProductById } = require('../db/products');
const { getCartByUserId, addProductToCart, createCart, deleteProductFromCart } = require('../db/cart')
const {getUserByToken, getAllUsers} = require("../db/User")


// /api/instruments
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await getProducts();
    res.send(allProducts);
  } catch (error) {
    next(error);
  }
});


// /api/instruments/:id
router.get('/strings/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//api/instruments/strings/:id
router.get('/carts/:userId', async (req, res)=>{
    // get my/user cart
    const { userId } = req. params;
    const cart = await getCartByUserId({ userId });
    res.send(cart);
    return;
})
router.post('/carts', async (req, res) => {
    const user = await getUserByToken(req.headers.authorization);
    const order = await getCartByUserId({ userId: user.id });
    const newCart = await purchaseCart({ orderId: order.id, userId: user.id });
    res.send(newCart);
  });
// post
router.post('/carts/:productId', async (req, res) => {
    const { productId } = req.params;
    
   
    const token = req.headers['authorization']; 
    const user = await getUserByToken(token);
    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
   
    let order = await getCartByUserId({ userId: user.id });
    if (!(order && order.id)) {
        await createCart({userId: user.id})
        
    }
    order = await getCartByUserId({ userId: user.id });
    await addProductToCart({ orderId: order.id, productId });
    const updatedCart = await getCartByUserId({ userId: user.id });
    res.send(updatedCart);
  });


  router.delete('/carts/:productId', async (req, res) => {
    const { productId } = req.params;
    const user = await getUserByToken(req.headers.authorization);
    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const order = await getCartByUserId({ userId: user.id });
    await deleteProductFromCart({ orderId: order.id, productId });
    const updatedCart = await getCartByUserId({ userId: user.id });
    res.send(updatedCart);
  });
  

  
module.exports = router;
