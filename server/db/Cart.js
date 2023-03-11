const client = require('./client');

// create cart(order)
const createCart = async ({ userId })=>{
    try {
        const SQL =`
        INSERT INTO orders ("userId")
        VALUES ($1)
        RETURNING *
        `;
        const response = await client.query(SQL, [ userId ])
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
};

// get cart by user id
const getCartByUserId = async ({ userId })=>{
    try {
        const SQL = ` 
        SELECT * FROM orders
        WHERE "userId" = $1 AND is_active = true;
        `;
        const response = await client.query(SQL, [userId]);
        const cart = response.rows[0];
        //get products
        const productsSQL = `
        SELECT * FROM order_products
        LEFT JOIN products ON order_products."productId" = "productId"
        WHERE order_products."orderId" = $1
        `;
        const productsResponse = await client.query(productsSQL, [cart.id]);
        cart.products = productsResponse.rows;
        return cart;
    } catch (error) {
    }
};
// add product to cart
const addProductToCart = async ({ orderId, productId }) => {
    // check if product is already in cart
    const checkSQL = `
      SELECT * FROM order_products
      WHERE orderId = $1 AND productId = $2
    `;
    const checkResponse = await client.query(checkSQL, [orderId, productId]);
    if (checkResponse.rows.length) {
      await client.query(
        `UPDATE order_products SET quantity = quantity + 1 WHERE orderId = $1 AND productId = $2`,
        [orderId, productId]
      );
      return;
    }
  
    const SQL = `
      INSERT INTO order_products(productId, orderId)
      VALUES($1, $2)
      RETURNING *
      `;
    await client.query(SQL, [productId, orderId]);
    return;
  };
  

module.exports = {
    createCart,
    getCartByUserId,
    addProductToCart
}