const client = require('./client');
// import woodwind from './instruments/woodwind';
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');

const {
  createTables,
  dropTables
} = require("./seedData")

const {
  createProducts
} = require("./products.js")

const {
  strings
} = require("./instruments/strings")
const {
  accessories
} = require("./instruments/accessories");
const {
  brass
} = require ("./instruments/brass");
const { 
  drums } = require ("./instruments/drums");

const {woodwind} = require ("./instruments/woodwind")

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
    price VARCHAR(20),
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

const getStrings= async (strings) => {
  let mergedStrings = " "
  for(let i =0; i < strings.length; i++){
     mergedStrings = await createProducts(strings[i])
     //console.log('this is strigns', mergedStrings)
    }
 }

 const getAccessories = async (accessories) => {
  //console.log('this is accessories', accessories)
  let mergedAccessories = " "
    for (let i = 0; i < accessories.length; i++){
        mergedAccessories = await createProducts(accessories[i])
        //console.log('this is accessories', mergedAccessories)
    }
 }

 const getBrass = async (brass) => {
  let mergedBrass = " "
    for (let i = 0; i < brass.length; i++) {
      mergedBrass = await createProducts(brass[i])
      //console.log('this is brass', mergedBrass)
    }
 };

 const getDrums = async (drums ) => {
    let mergedDrums = " ";
    for (let i = 0; i < drums.length; i++) {
      mergedDrums = await createProducts(drums[i])
     // console.log('this is drums', mergedDrums)
    }
 }

 const getWoodwind = async (woodwind) => {
  let mergedWoodWind = " ";
  for (let i = 0; i < woodwind.length; i++){
    mergedWoodWind= await createProducts(woodwind[i])
    console.log('this is woodwind', mergedWoodWind)
  }
 }

const syncAndSeed = async()=> {
  await syncTables();
  await getStrings(strings);
  await getAccessories(accessories);
  await getBrass(brass);
  await getDrums(drums);
  await getWoodwind(woodwind)

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
  console.log((strings))
};







module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client,
  createTables,
  dropTables,
};
