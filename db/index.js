const {Client} = require('pg');

const connectionString = 'postgres://localhost:5432/post3'

const client =  new Client({connectionString});

async function createUser  (user)  {
    const {name, password, email} = user
    try{
        const {rows: [user]} = await client.query(`
        INSERT INTO users (name, password,email)
        VALUES ($1,$2,$3)
       
        RETURNING*;
        `,[name, password, email])
        console.log(user)
        return user;

    }catch(error) {
        console.log('Error Creating User!!')
    }
};

// LEFT JOIN RIGHT JOIN AND INNER JOIN
const getUsersAndCart = async () => {
  try{
    const { rows } = await client.query(`
    SELECT users.id AS "CartOwner" , cart.id AS "Cart", cart.quantity AS " CartQuantity"
    FROM cart
RIGHT JOIN users ON cart."cartUserId" = users.Id;
    
    `);
  
    return rows;
  }catch(ex){
    console.log('ERROR GETTING Users and cart!!!');
    //console.log(ex.error)
  }
};

const createCartInventory = async (cartItem) => {
    const { quantity, total, cartUserId, productsId } = cartItem;
    try{
        const {rows: cartItem} = await client.query(`
        INSERT INTO cart (quantity, total, "cartUserId", "productsId")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        ` ,[quantity, total, cartUserId, productsId]);
        
      console.log(cartItem);
        return cartItem;
    }catch (error) {
        console.log('ERROR CREATING Cart Item!!!!');
       console.error(error)
    }

};
const createProducts = async (product) => {
    const { name, description, price, photo } = product;
    try{
        const {rows: [product]} = await client.query(`
        INSERT INTO products (name, description, price, photo )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        ` ,[name, description, price, photo ]);
        
      console.log(product);
        return product;
    }catch (error) {
        console.log('ERROR CREATING Product!!!!');
       console.error(error)
    }

};

async function addItemToCart( quantity, total, cartUserId,productsId) {
    try {
  await client.query(`
        INSERT INTO cart (quantity, total, "cartUserId", "productsId")
        VALUES ($1, $2, $3, $4)
        RETURNING*;
      `, [quantity,total,cartUserId,productsId]);
  
      
    } catch (error) {
      throw error
    }
  }

module.exports = {
    client,
    createUser,
    createCartInventory,
    createProducts,
    addItemToCart,
    getUsersAndCart
}