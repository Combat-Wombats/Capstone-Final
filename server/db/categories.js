const client = require('./client');

//const jwt = require('jsonwebtoken');
//const JWT = process.env.JWT;

const createCategory = async ({category})=>{
 try {
  const SQL = `
      INSERT INTO categories(category)
      VALUES ($1)
      RETURNING *
    `;
  const response = await client.query(SQL, [category]);
  return response.rows[0]
  } catch (error) {
    console.log(error)
  
  }
}
  


module.exports = {
  createCategory
}