const client = require('./client');
const {createCategory, getCategories} = require('./categories');
const { getUserByToken, createUser, authenticate } = require('./User');
const { createProducts } = require('./products');
const { createCart } = require('./cart')
const { strings } = require('./instruments/strings');
const { accessories } = require('./instruments/accessories');
const { brass } = require('./instruments/brass');
const { drums } = require('./instruments/drums');
const { woodwind } = require('./instruments/woodwind');

const dropTables = async () => {

  const SQL = `
  DROP TABLE IF EXISTS order_products;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS categories;
  DROP TABLE IF EXISTS users;

`;
  await client.query(SQL);
};
//ADAM: created dropTables function above ^^

const syncTables = async () => {
  const SQL = `

  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT false
  );
  CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR (255) NOT NULL
    );

  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    features text,
    price VARCHAR(20),
    location text,
    "willDeliver" BOOLEAN,
    used BOOLEAN,
    shipping BOOLEAN,
    "categoryId" integer references categories(id),
    img VARCHAR(255)
    );
  CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    is_active BOOLEAN DEFAULT true,
    "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE
    );
  CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    "orderId" INTEGER REFERENCES orders(id),
    "productId" INTEGER REFERENCES products(id),
    quantity INTEGER,
    UNIQUE("orderId", "productId")
    );
  `;
  await client.query(SQL);
};

// ADAM: let's avoid having orderId, productId ...etc as primary id key, use 'id' instead !

const getStrings = async strings => {
  let mergedStrings = ' ';
  for (let i = 0; i < strings.length; i++) {
    strings[i].categoryId = 1;
    mergedStrings = await createProducts(strings[i]);
  }
};

const getAccessories = async accessories => {
  let mergedAccessories = ' ';
  for (let i = 0; i < accessories.length; i++) {
    accessories[i].categoryId = 2;
    mergedAccessories = await createProducts(accessories[i]);
  }
};

const getBrass = async brass => {
  let mergedBrass = ' ';
  for (let i = 0; i < brass.length; i++) {
    brass[i].categoryId = 3;
    mergedBrass = await createProducts(brass[i]);
  }
};

const getDrums = async drums => {
  let mergedDrums = ' ';
  for (let i = 0; i < drums.length; i++) {
    drums[i].categoryId = 4;
    mergedDrums = await createProducts(drums[i]);
  }
};

const getWoodwind = async woodwind => {
  let mergedWoodWind = ' ';
  for (let i = 0; i < woodwind.length; i++) {
    woodwind[i].categoryId = 5;
    mergedWoodWind = await createProducts(woodwind[i]);
  }
};

const syncAndSeed = async () => {
  await dropTables();
  await syncTables();
  await createCategory({ category: 'strings' });
  await createCategory({ category: 'accessories' });
  await createCategory({ category: 'brass' });
  await createCategory({ category: 'drums' });
  await createCategory({ category: 'woodwind' });
  await getStrings(strings);
  await getAccessories(accessories);
  await getBrass(brass);
  await getDrums(drums);
  await getWoodwind(woodwind);

  const [moe, lucy] = await Promise.all([
    createUser({
      username: 'moe',
      password: 'moe_password',
      admin: true
    }),
    createUser({
      username: 'lucy',
      password: 'lucy_password',
     admin: false
    })
  ]);
   const [moeCart, lucyCart] = await Promise.all([
    createCart({ userId: moe.id }),
    createCart({ userId: lucy.id }),
   ]);

};

module.exports = {
  syncAndSeed,
  dropTables,
  createUser,
  authenticate,
  getUserByToken,
  dropTables,
  getCategories,
  client

};
