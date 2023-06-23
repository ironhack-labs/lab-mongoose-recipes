const recipes = require('../data.json');
const Recipe = require('./Recipe.model');

function insertRecipes() {
  Recipe.insertMany(recipes)
    .then((insertedRecipes) => {
      console.log('Recipes inserted successfully.');
      console.log('Recipe titles:');
      insertedRecipes.forEach((recipe) => {
        console.log(recipe.title);
      });
    })
    .catch((error) => {
      console.error('Error inserting recipes:', error);
    });
}

module.exports = insertRecipes;