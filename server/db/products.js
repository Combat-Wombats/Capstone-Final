const client = require('./client');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

const createProducts = async ({price, name, description, used, location, willDeliver, shipping})=>{
const SQL = `
INSERT INTO products(price, name, description, used, location, willDeliver, shipping)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *
`;
const response = await client.query(SQL, [price, name, description, used, location, willDeliver, shipping])
return response.rows[0]
}

module.exports = {
  createProducts
}