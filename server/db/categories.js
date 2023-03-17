const client = require('./client');

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

const getCategories = async ()=>{
  try {
    const SQL = `
    SELECT * FROM categories`;
    const response = await client.query(SQL)
    return response.rows
  } catch (error) {
    console.log(error)
  }
}
  
module.exports = {
  createCategory,
  getCategories
}