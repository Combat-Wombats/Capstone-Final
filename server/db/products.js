const client = require('./client');

const createProducts = async ({
  name,
  description,
  features,
  price,
  location,
  willDeliver,
  used,
  shipping,
  categoryId
}) => {
  try {
    const SQL = `
      INSERT INTO products(name, description, features, price, location, "willDeliver", used, shipping, "categoryId")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const response = await client.query(SQL, [
      name,
      description,
      features,
      price,
      location,
      willDeliver,
      used,
      shipping,
      categoryId
    ]);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async () => {
  try {
    const SQL = `
    SELECT * FROM products
    `;
    const response = await client.query(SQL);
    return response.rows;
  } catch (error) {
    console.log(error);
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

const getProductById = async id => {
  try {
    const { rows: [product] } = await client.query(
      `
        SELECT *
        FROM products
        WHERE id = $1
        `,
      [id]
    );
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createProducts,
  getProducts,
  getProductById
};
