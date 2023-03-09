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

const {createCategory, getCategories} = require('./categories');

const syncTables = async()=> {
  console.log("syncing tables")
  // DROP TABLE IF EXISTS order_products;
  // DROP TABLE IF EXISTS orders;
  // DROP TABLE IF EXISTS users;
  // DROP TABLE IF EXISTS products;
  // DROP TABLE IF EXISTS categories;
  const SQL = `


  CREATE TABLE users(
    "userId" SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255)
  );
  CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR (255) NOT NULL
    );
      CREATE TABLE products (
    "productId" SERIAL PRIMARY KEY,
    name text,
    description text,
    features text,
    price VARCHAR(20),
    location text,
    "willDeliver" BOOLEAN,
    used BOOLEAN,
    shipping BOOLEAN,
    "categoryId" integer references categories(id)
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
    strings[i].categoryId = 1;
     mergedStrings = await createProducts(strings[i])
     //console.log('this is strigns', mergedStrings)
    }
 }

 const getAccessories = async (accessories) => {
  //console.log('this is accessories', accessories)
  let mergedAccessories = " "
    for (let i = 0; i < accessories.length; i++){
      accessories[i].categoryId = 2;
        mergedAccessories = await createProducts(accessories[i])
        //console.log('this is accessories', mergedAccessories)
    }
 }

 const getBrass = async (brass) => {
  let mergedBrass = " "
    for (let i = 0; i < brass.length; i++) {
      brass[i].categoryId = 3
      mergedBrass = await createProducts(brass[i])
      //console.log('this is brass', mergedBrass)
    }
 };

 const getDrums = async (drums ) => {
    let mergedDrums = " ";
    for (let i = 0; i < drums.length; i++) {
      drums[i].categoryId = 4
      mergedDrums = await createProducts(drums[i])
     // console.log('this is drums', mergedDrums)
    }
 }

 const getWoodwind = async (woodwind) => {
  let mergedWoodWind = " ";
  for (let i = 0; i < woodwind.length; i++){
    woodwind[i].categoryId = 5
    mergedWoodWind= await createProducts(woodwind[i])
    //console.log('this is woodwind', mergedWoodWind)
  }
 }

const syncAndSeed = async()=> {
  await syncTables();
  await createCategory({category: "strings"});
  await createCategory({category: "accessories"});
  await createCategory({category: "brass"});
  await createCategory({category: "drums"});
  await createCategory({category: "woodwind"});
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
  // console.log('--- seeded users ---');
  // console.log(moe);
  // console.log(lucy);
  // console.log((strings))
};







module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client,
  createTables,
  dropTables,
  getCategories
};
