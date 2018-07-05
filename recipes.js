const mongoose = require('mongoose');
const Recipes = require('./Recipe')

const data = require('./data.js')



  Recipes.create(data);

  Recipes.create({
    title: 'Caldos de gallina',
    level: 'UltraPro Chef',
    ingredients: ['1 pollo', '1 lt water', 'salt'],
    dishType: ['Dish'],
    image: 'http://cdn.shopify.com/s/files/1/1140/5462/products/caldo_de_gallina_web_1024x1024.jpg?v=1454511660',
    duration: 30,
    creator: 'Chef Alguien',
    cousine: 'Mexican'
  }
  );
//update
  Recipes.findByIdAndUpdate( '5b3e7584cdaf501d83a7adb1', {duration: 100})
  

//remove

Recipes.findByIdAndRemove('5b3e7584cdaf501d83a7adb0')

  mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


