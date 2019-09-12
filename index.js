const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
 
  function newRecipe () {
    Recipe.create( {
      title: 'Banana Pancakes',
      level: 'Amateur Chef',
      ingredients: ['Banana', 'Pancakes'],
      cuisine: 'Breakfeast',
      dishType: 'Dish',
      image: 'none',
      duration: 10,
      creator: 'Nick'
    })
    .then(recepie => {
      console.log(`${recepie.title} created`);
    })
    .catch(error => {
      console.log('Error creating recipe');
    });
  }

  function insertRecipes() {
    Recipe.insertMany(data)
    .then(recipe => {
      for (let recipes of recipe) {
      console.log(`${recipes.title} added to the database`);
    }
    })
    .catch(error => {
      console.log('Error adding recipes to the database');
    });
  }

  function loadSingleItem() {
    Recipe.findOne({ title: "Pizza" })
    .then(recipe => {
      console.log(recipe);
      recipe.duration = 100;
      recipe.save()
      .then(() => {
        console.log('Recipe successfully changed!');
      })
      .catch(error => {
        console.log('Error saving recipe!');
      });
    })
    .catch(error => {
      console.log('Error loading recipe');
    });
  }

  function deleteOneItem() {
    Recipe.deleteOne({ title: "Carrot Cake"})
    .then(recipe => {
      console.log('Recipe deleted');
    })
    .catch(error => {
      console.log('Error loading recipe');
    });

  }