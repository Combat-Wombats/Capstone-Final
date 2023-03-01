const client = require('./client');
////const jwt = require('jsonwebtoken');
//const JWT = process.env.JWT;

// const createProducts = async ({name, price, description, used, location, willDeliver, shipping})=>{
// const SQL = `
// INSERT INTO products(name, price, description, used, location, willDeliver, shipping)
// VALUES ($1, $2, $3, $4, $5, $6, $7)
// RETURNING *
// `;
// const response = await client.query(SQL, [name, price, description, used, location, willDeliver, shipping])
// return response.rows[0]
// }

module.exports = {
  createProducts
}