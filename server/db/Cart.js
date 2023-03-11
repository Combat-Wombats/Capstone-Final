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
const addProductToCart = async ({ cartId, productId }) => {
    // check if product is already in cart
    const checkSQL = `
      SELECT * FROM cart_products
      WHERE cart_id = $1 AND product_id = $2
    `;
    const checkResponse = await client.query(checkSQL, [cartId, productId]);
    if (checkResponse.rows.length) {
      await client.query(
        `UPDATE cart_products SET quantity = quantity + 1 WHERE cart_id = $1 AND product_id = $2`,
        [cartId, productId]
      );
      return;
    }
  
    const SQL = `
      INSERT INTO cart_products(product_id, cart_id)
      VALUES($1, $2)
      RETURNING *
      `;
    await client.query(SQL, [productId, cartId]);
    return;
  };
  

module.exports = {
    createCart,
    getCartByUserId,
    addProductToCart
}