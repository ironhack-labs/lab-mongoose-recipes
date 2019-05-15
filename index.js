const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'


// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    addNewRecipe("Tea", "UltraPro Chef", ["Farming", "Earth", "Grass", "Water", "Wood", "Stone"], "Alien", 'Other', "https://2.bp.blogspot.com/_qoJr7kKgahs/TJCbu1vdp3I/AAAAAAAARN0/AFd_GW3ejLk/w1200-h630-p-k-no-nu/blowing-water-14.jpg", 100, "Sachin", new Date())
      .then(recipe => {
        console.log(recipe.title)
        Recipe.insertMany(data)
          .then(recipes => {
            recipes.forEach(recipe => {
              console.log(recipe.title)
            })
            // recipe.find
          })
          .catch(err => console.log("algo malo", err))
      })
      .catch(err => console.log("Algo malo pasa", err))
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const addNewRecipe = (recipeTitle, recipeLevel, recipeIngredients, recipeCuisine, recipeDishType, recipeImage, recipeDuration, recipeCreator, recipeCreated) => {
  const dish = new Recipe({ title: recipeTitle, level: recipeLevel, ingredients: recipeIngredients, cuisine: recipeCuisine, dishType: recipeDishType, image: recipeImage, duration: recipeDuration, creator: recipeCreator, created: recipeCreated })
  return dish.save()
}




// )
// Recipe.find({ title }).then(() => console.log(Recipe.title))
//   .catch(err => console.log('Error', err))
