const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/Recipes.js');



mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');   
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

function createRecipe() {
  Recipe.create({
    title: "Short Rib and Cauliflower Curry",
    level: 'Amateur Chef',
    ingredients: ['2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
    cuisine: 'American',
    dishType: ['Dish'],
    duration: 200,
    creator: 'Chef John'
  })
  .then((rcp) => {
    console.log('recipe created', rcp.title);
  })
  .catch((err) => {
    console.log(err);
  })
}

function insertMany() {
  Recipe.insertMany(data)
  .then((rcp) => {
    console.log('inserted many');
  })
  .catch((err) => {
    console.log(err)
  });
}
  

function deleteOne() {
  Recipe.deleteOne({name: 'Carrot cake' })
    .then((rcp) => {
      console.log('recipe deleted')
    })
    .catch((err) => {
      console.log(err)
    });
}
  

function closeConnection() {
  mongoose.connection.close()
  .then(() => {
    console.log('connection closed');
  })
  .catch((err) => {
    console.log(err)
  })
}
  
mongoose.connection.on('connected', () => {
})
