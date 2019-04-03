require('../recipes');

const mongoose = require('mongoose');
const Recipe   = require('../models/recipe.model');
const recipes  = require('../data');

// Iteration 2
const myRecipe = {
  title: 'Spanish Omelette',
  level: 'Easy Peasy',
  ingredients: ['4 potatoes', '4 eggs', '2 onions', 'milk', 'salt', 'oil'],
  cuisine: 'Spanish',
  dishType: ['Dish'],
  duration: 30,
  creator: 'Chef David'
}

Recipe.create(myRecipe)
  .then( () => console.log( myRecipe.title ) )
  .catch( error => console.error(error) )

// Iteration 3
Recipe.insertMany(recipes)
  .then( () => { recipes.forEach( recipe => console.log(recipe.title) ); } )
  .catch( error => console.error(error) )

// Iteration 4
const recipeName = 'Rigatoni alla Genovese';

Recipe.update( {title: recipeName}, { $set: {duration: 100} })
  .then( () => console.log('Update was successful!') )
  .catch( error => console.error(error) )

// Iteration 5
const recipeName = 'Spanish Omelette';

Recipe.remove( {title: recipeName} )
  .then( () => console.log('Recipe was removed :(') )
  .catch( error => console.error(error) )

// Iteration 6 
mongoose.connection.close()
  .then( () => console.log('Database was closed') )
  .catch( error => console.error(error) )
  