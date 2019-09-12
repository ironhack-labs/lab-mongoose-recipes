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
    let bananaPancakes = {
      title: 'Banana Pancakes',
      level: 'Easy Peasy',
      ingredients: ['Banana', 'Pancakes'],
      cuisine: 'flapjack',
      dishType: 'Breakfast',
      image: 'none',
      duration: 10,
      creator: 'Nick'
    }
    let recipe = new Recipe(bananaPancakes)
    recipe.save()
    console.log(recipe)
}
  
function makeManyRecipes() {
  Recipe.insertMany(data)
  console.log(Recipe.find({}).map(r => r.title))
}

  function loadSingleItem() {
    Recipe.findOne({ title: "Rigatoni alla Genovese" })
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

  Recipe.deleteMany({}).then(result=>console.log(result)).catch(err=>console.log(err))