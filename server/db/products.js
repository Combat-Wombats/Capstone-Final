const client = require('./client');

//const jwt = require('jsonwebtoken');
//const JWT = process.env.JWT;

const createProducts = async ({name, description, features, price, location, willDeliver, used, shipping})=>{
 try {
  const SQL = `
      INSERT INTO products(name, description, features, price, location, willDeliver, used, shipping)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
  const response = await client.query(SQL, [name, description, features, price, location, willDeliver, used, shipping])
  return response.rows[0]
  } catch (error) {
    console.log(error)
  
  }
}
  


module.exports = {
  createProducts
}
