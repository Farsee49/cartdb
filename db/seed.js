console.log("Felix=Goodboy")

const {
    users,
    cart,
    cartItems,
    products
} = require('./seed_data.js')
const {
    client,
    createUser,
    createCartInventory,
    createProducts,
    addItemToCart,
    getUsersAndCart
} = require('./index.js');



async function dropTables () {
    try{
     await client.query(`
      DROP TABLE IF EXISTS cart_inventory;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
     `)
    }catch(er){
        console.log('SHIT IS BROKE IN DROPPING TABLES');
        console.log(er);
      }

};


async function createTables() {
    try{
     await client.query(`
       CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255)
        );

        CREATE TABLE products (
         id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description VARCHAR(255)  NOT NULL,
          price INTEGER,
          photo VARCHAR(255)
        );

         CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        quantity INTEGER ,
        total INTEGER,
        "cartUserId" INTEGER REFERENCES users(id),
        "productsId" INTEGER REFERENCES products(id)
        );

        
        CREATE TABLE cart_inventory (
         id SERIAL PRIMARY KEY,
         "cartId" INTEGER REFERENCES cart(id)
         
        );

   `)
    }catch(err){
        console.log('Problem Creating Tables!!!')
    }
};

async function createInitialUsers   ()  {
    try{
        await Promise.all(users.map(createUser))
    }catch(err){
        console.log('Error Cteating Users!!')
    
    }
};
async function createInitialCart   ()  {
    try{
        await Promise.all(cartItems.map(createCartInventory))
    }catch(err){
        console.log('Error Cteating Cart!!')
    
    }
};
async function createInitialProducts ()  {
    try{
        await Promise.all(products.map(createProducts))
    }catch(err){
        console.log('Error Creating Products!!')
    
    }
};

async function buildDB () {
    try{
        console.log('Starting DB Build....');
        client.connect();
        console.log('Starting to Drop Tables....');
        dropTables();
        console.log('Finished Dropping Tables....');
        console.log('Creating Tables....');
        createTables();
        console.log('Fished Creating Tables....');
        console.log('Creating Users....');
        createInitialUsers();
        console.log('Finished Creating Users....');
        console.log('Creating Cart Inventory....');
        createInitialCart();
        console.log('Finished Creating Cart Inventory....');
        console.log('Creating Products....');
        createInitialProducts();
        console.log('Finished Creating Products....');
    await addItemToCart(1,3,2,8)
    await addItemToCart(3,4,2,5)
    await addItemToCart(1,3,2,7)
    await addItemToCart(1,4,2,1)
    await addItemToCart(1,3,2,6)
    const cartUser = await getUsersAndCart();
    console.log("cartuser", cartUser)

    }catch(err){
        console.log('ERROR Building DB!!');
        console.error('ERROR Building DB', err);
    }
};

buildDB();