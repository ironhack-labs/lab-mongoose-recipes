const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create(
      {title:'French onion soup', 
      level:'Amateur Chef', 
      ingridients:['4 Onions',
                  '25cl white wine',
                  '1tb olive oil',
                  '1tb veal stock',
                  '100g comte cheese',
                  '6 slices of french bread',
                  '1 cup of water',
                  '1tb flour',
                  'salt & pepper',
                  '50g of butter'],
      cuisine:'French',
      dishType:'soup',
      image:'https://assets.afcdn.com/recipe/20160401/30155_w1024h768c1cx1632cy2464.jpg',
      duration:45,
      creator: 'Jide',
      }) 
      .then(pizza => console.log('Recipe added',pizza))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



  