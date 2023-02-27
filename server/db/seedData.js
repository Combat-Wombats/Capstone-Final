const client = require("./client")

async function createTables() {
    await client.query(`
    CREATE TABLE products (
    "productId" SERIAL PRIMARY KEY,
    price INTEGER,
    description text,
    used BOOLEAN,
    location text,
    willDeliver BOOLEAN,
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
    `)
}

async function dropTables() {
    await client.query(`
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    
    `)
}


async function rebuildDB() {
    try {
        await dropTables()
        await createTables()
        
       
    } catch (error) {
        console.log("error during rebuildDB")
        throw error
    }
}

module.exports = {
    rebuildDB,
    dropTables,
    createTables,
    client
}