const client = require('./client');

//const jwt = require('jsonwebtoken');
//const JWT = process.env.JWT;

const createProducts = async ({name, description, features, price, location, willDeliver, used, shipping, categoryId})=>{
 try {
  const SQL = `
      INSERT INTO products(name, description, features, price, location, "willDeliver", used, shipping, "categoryId")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
  const response = await client.query(SQL, [name, description, features, price, location, willDeliver, used, shipping, categoryId])
  return response.rows[0]
  } catch (error) {
    console.log(error)
  
  }
}

const getProducts = async()=>{
  try {
    const SQL = `
    SELECT * FROM products
    `;
    const response = await client.query(SQL)
    return response.rows
  } catch (error) {
    console.log(error)
    
  }
}
  
const getSingleProduct = async({productId}) => {
try {
  const SQL =`
  SELECT * FROM products
  WHERE "productId" = $1`;
  const response =await client.query(SQL, [productId])
  return response.rows
} catch (error) {
  console.log(error)
  
}
}

module.exports = {
  createProducts,
  getProducts,
  getSingleProduct

}
