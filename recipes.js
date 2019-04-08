const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Recipe = require ('models/recipes.model.js')
const recipes = require('/data.js');
const PORT= 3000;

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipe = {
    title: 'Brownie',
    level: 'masterched',
    ingredients: [
      '4 huevos', 
      '80g mantequilla', 
      '200g Azucar', 
      '250g chocolate', 
      ],
    cuisine: 'Española',
    dishType: ['Dessert'],
    image: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj4nefH58DhAhUGhRoKHZ96DkQQjRx6BAgBEAU&url=http%3A%2F%2Frecetasdecocina.elmundo.es%2F2018%2F03%2Fbrownie-chocolate-receta-facil.html&psig=AOvVaw3vrzhn0szJqbYbgV04QmLI&ust=1554823640005014',
    duration: 25,
    creator: 'Vic'
  }

  //2a it
  Recipe.create(recipe)
    .then((recipe) =>{
      console.info ('Recipe Created', recipe.title);
      return Recipe.insertMany(recipes)
    }) 
    //
    .then((recipes) =>{
      for (let recipe of recipes) {
        console.info('Recipe Created', recipe.title);
      }
    })