const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');

const {
  createTables,
  dropTables
} = require("./seedData")

const syncTables = async()=> {
  console.log("syncing tables")
  const SQL = `
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;

  CREATE TABLE users(
    "userId" SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255)
  );
      CREATE TABLE products (
    "productId" SERIAL PRIMARY KEY,
    name text,
    description text,
    features text,
    price INTEGER,
    location text,
    willDeliver BOOLEAN,
    used BOOLEAN,
    shipping BOOLEAN
    );
    CREATE TABLE categories (
    id INTEGER REFERENCES products("productId"),
    percussion_Drums INTEGER,
    woodwinds INTEGER,
    brass INTEGER,
    accesories INTEGER,
    test VARCHAR(100)
    );
    CREATE TABLE orders (
    "orderId" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users("userId")
    );
    CREATE TABLE order_products(
    "productId" INTEGER REFERENCES products("productId"),
    "orderId" INTEGER REFERENCES orders("orderId")
    )
    
  `;
  await client.query(SQL);
};

const syncAndSeed = async()=> {
  await syncTables();

  //const [guitar, piano] 


  const [moe, lucy]  = await Promise.all([
    createUser({
      username: 'moe',
      password: 'moe_password',
      email: 'moe@moe.com'
    }),
    createUser({
      username: 'lucy',
      password: 'lucy_password',
      email: 'lucy@lucy.com'
    })
  ]);
  console.log('--- seeded users ---');
  console.log(moe);
  console.log(lucy);
};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client,
  createTables,
  dropTables
};
