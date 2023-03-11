const client = require('./client');

// create cart(order)
const createCart = async ({ userId })=>{
    try {
        const SQL =`
        INSERT INTO orders (user_id)
        VALUES ($1)
        RETURNING *
        `;
        const response = await client.query(SQL, [ userId ])
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    createCart
}