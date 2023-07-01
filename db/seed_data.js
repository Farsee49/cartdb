



const users = [
    {
        name: 'Felix',
        password: 'felix00'
    },
    {
        name: 'Matt',
        password: 'matt00'
    },
    {
        name: 'Kelly',
        password: 'kelly00'
    },
    {
        name: 'Jeff',
        password: 'jeff00'
    },
    {
        name: 'Sherri',
        password: 'sherri00'
    },
    {
        name: 'Punt',
        password: 'punt00'
    }
  
];

const cartItems = [
    {  quantity: 1, total: 5000, cartUserId: 1, cartProductId: 5 ,productId: 5},
    {  quantity: 1, total: 5000, cartUserId: 2, cartProductId: 2, productId: 4},
  ];
  const products = [
    {
        name:'chicken',
        description:'cold',
        price: 2
    },
    {
        name:'steak',
        description:'meat',
        price: 6
    },
    {
        name:'beer',
        description:'beverage',
        price: 1
    },
    {
        name:'coke',
        description:'beverage',
        price: 1
    },
    {
        name:'water',
        description:'beverage',
        price: 2
    },
    {
        name:'air',
        description:'in a can',
        price: 6
    },
    {
        name:'pickle',
        description:'food',
        price: 5
    },
    {
        name:'cheese',
        description:'food',
        price: 5
    },
    {
        name:'bread',
        description:'food',
        price: 7
    },
    {
        name:'fish',
        description:'pet',
        price: 2
    },
  ]

module.exports = {
    users,
    cartItems,
    products
};