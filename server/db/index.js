const client = require('./client');
// import woodwind from './instruments/woodwind';
 const {strings} = require ('./instruments/strings')
const {createProducts} = require('./products')
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

  console.log('seeded products')

  const stringTable = (strings) => {
    for (let i = 0; i <strings.length; i++){
      let string= strings[i]
      console.log(string)
      return string
    } 
    return stringTable 
  }

  const syncProductTables =  await Promise.all([
   
    createProducts({
      name: "Fender Player Tex-Mex Stratocaster Limited-Edition Electric Guitar Sonic Blue",
            description: " The limited-edition Fender Player Tex-Mex Stratocaster features a classic sound—bell-like high end, punchy mids and robust low end, combined with crystal-clear articulation. It's ready to serve your musical vision, it’s versatile enough to handle any style of music and it’s the perfect platform for creating your own sound. The power trio of Tex-Mex single-coil pickups are crisp and articulate, giving you that authentic Fender tone with a modern edge. The modern C-shaped maple neck's comfortable contours and smooth finish are ideal for almost any playing style. The updated two-point tremolo design has smoother travel for enhanced playing feel while simultaneously giving you rock-solid tuning stability since there’s less friction against the posts. Other features include master volume and tone controls, a five-way pickup switch, three-ply pickguard, synthetic bone nut, dual-wing string tree, sealed tuning machines and four-bolt 'F'- stamped neck plate that marks this instrument as the real deal—as Fender as it gets. Own your tone and create something new with the Player Stratocaster",
            features: [ "Alder body" ,
                        "Modern c-shaped maple neck", 
                        "Maple fingerboard",
                        "Tex-Mex single-coil pickups"
                    ],        
            price: "$899.99",
            location: "New York",
            willDeliver: "yes",
            used: "No",
            shipping: "yes"

    }),
    createProducts({
      name: "  PRS Singlecut McCarty 594 Electric Guitar Black Gold Sunburst ",
      description: " With dual volume and push/pull tone controls, 3-way pickup selector on the upper bout, two-piece bridge and vintage-style tuners, the PRS SE McCarty 594 Singlecut electric guitar is built with a classic feature set that will make players feel right at home. Its 58/15 LT 'S' pickups were carefully designed to deliver warm, vintage-inspired tone with sweetness and clarity. Whether you're looking for rich, authentic humbucking tones or nuanced, sweet single coils, the SE McCarty 594 Singlecut can master both sonic territories with ease. Other specifications include a bound 22-fret, 24.594 inch scale length Pattern Vintage neck and slightly thicker back for sustain. Designed to capture the heart of the McCarty family of instruments, the SE McCarty 594 Singlecut is a high-quality workhorse instrument.",
      features: [ "Mahogany top and mahogany body", 
                  "Mahogany neck with Pattern Vintage neck", 
                  "Rosewood fingerboard", 
                  "Dual 58/15 LT 'S' humbuckers"
              ],
      price: "$940.99",
      location: "Chicago",
      willDeliver : "yes",
      used: "no",
      shipping: "yes"
  }),
  createProducts({
      name: "  Ibanez ALT30FM Altstar Flamed-Top Dreadnought Acoustic-Electric Guitar Emerald Doom Burst",
      description: "The Ibanez ALT30FM Altstar acoustic-electric is the perfect instrument for the aspiring electric player with a drive to explore the world of acoustic guitars. Ibanez’s Altstar series offers acoustic instruments that electric guitarists will find inviting and easy to play. The Altstar series features a compact dreadnought body, 15.7 inch fingerboard radius, tighter string spacing and 25.5 inch scale neck, all designed to offer electric guitarists a seamless transition to acoustic playing. The single-cut Altstar also features a neck joint at the 16th fret, rather than the 12th fret, affording unparalleled upper fret access. Whether you’re just looking to delve into the world of acoustic guitars, or are seeking a quieter practice option while maintaining an electric guitar feel, the Ibanez ALT30FM Altstar is your axe.",
      features: " Flamed maple top, laminated sapele back and sides; Maple neck, walnut fingerboard; Undersaddle piezo; Gloss-finished body, satin-finished neck",
      price: "$345.99",
      location: "Vegas",
      willDeliver: "yes",
      used: "no",
      shipping: "yes"
  }),
 createProducts ({
      name: "Epiphone PR-150 Acoustic Guitar Natural",
      description: " The easy-to-afford Epiphone PR-150 dreadnought acoustic guitar is the perfect instrument to get started on. It has classic looks, great tone and is made to be road tough. Like all worthy acoustic guitars, it begins and ends with tonewoods, and for the PR-150, Epiphone chose a select spruce top and mahogany body for a classic sound that's balanced, clear and will only get better with age and lots of playing. The rosewood bridge and synthetic bone saddle are a perfect match for the resonant profile of the select spruce top." +
                   " The vintage-style soundhole on the PR-150 is supported by a tortoiseshell-style pickguard with the '60s-era 'E' logo. The SlipTaper 25.5 inch scale mahogany neck has a rosewood fingerboard with dot inlays, a 12-inch radius, a 1.68-inch nut, premium die-cast 14:1 tuners, and the classic '60s-era Sloped Dovewing headstock. The Epiphone's all-nickel hardware will last as long as you play the guitar, and the PR-150 comes in two color finishes, Natural (NA) and Vintage Sunburst (VS)." ,
      features: [  "Dreadnought style",
                   "Spruce top",
                   "Mahogany back and sides",
                   "Mahogany neck",
                   "Rosewood fretboard",
                   "Chrome hardware"
              ],
      price: " $179.99 ",
      location: "Seattle",
      willDeliver: "yes",
      used: "no",
      shipping: "yes"          
  }),
  createProducts({
      name: " Epiphone Dove Studio Limited-Edition Acoustic-Electric Guitar Alpine White",
      description: " This Epiphone Dove Studio Limited-Edition acoustic-electric guitar comes in a cool Alpine White finish recreating the '60s classic, and features a solid spruce top and iconic pickguard art, plus the Fishman Sonitone pickup system and Grover machine heads. Case sold separately.",
      features: [ "D'Addario phosphor (12-53) strings",
                  "Imitation tortoise pickguard with Dove artwork",
                  " Traditional dove-shaped bridge with Dove inlays",
                  "Pearloid parallelograms fingerboard inlays",
                  " Nickel hardware",
                  " Glued-in neck joint",
                  " Adjustable truss rod",
                  "5-ply white/black top binding",
                  "1-ply white back binding",
                  "1-ply fingerboard white binding" ],
      price: " $449.99",
      location: "Austin",
      willDeliver: "yes",
      used: "no" ,
      shipping: "yes"
  }),
  createProducts({
      name: "  Gibson Hummingbird Original Acoustic-Electric Guitar Heritage Cherry Sunburst",
      description: "N/A",
      features: [],
      price: "$3999.99",
      location: "Portland",
      willDeliver: "yes",
      used: "no",
      shipping: "yes"
    })
  ])
  console.log(syncProductTables)
};


// const syncProductsTable= async()=>{
//   await syncTables();
//   const pr0ducts = await Promise.all([
//   createProducts({
//     strings({name, description, features, price, location, willDeliver, used, shipping})
//   })
//   ])} 


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client,
  createTables,
  dropTables,
  stringTable
};
