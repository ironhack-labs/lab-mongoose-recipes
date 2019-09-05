const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(message => {
    console.log('Connected to Mongo!');
    // newRecipe();
    // insertRecipes();
    // loadSingleItem();
    deleteOneItem();
  }).catch(error => {
    console.error('Error connecting to mongo', error);
  });

  function newRecipe () {
    Recipe.create( {
      title: 'Marcos Hamburger',
      level: 'Amateur Chef',
      ingredients: ['Meat', 'bread'],
      cuisine: 'Spanish',
      dishType: 'Dish',
      image: 'none',
      duration: 10,
      creator: 'Marcos'
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
    Recipe.findOne({ title: "Rigatoni alla Genovese" })
    .then(recipe => {
      console.log(recipe);
      recipe.duration = 100;
      recipe.save()
      .then(() => {
        console.log('recipe successfully changed!');
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