const mongoose = require('mongoose');
// we use Schema class given by mongoose
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// based on that Schema we create a blueprint for our students collection
const recipeSchema = new Schema ({
  title:{
    type: String,
    required: true
  },
  level: { 
    type: String,
     enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] 
  },
  ingredients: { type: Array },
  cuisine: { 
    type: String, 
    required: true 
  },
  dishType: {
    type: String, 
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: { type: String, 
    default: 'https://images.media-allrecipes.com/images/75131.jpg.'
  },
  duration: { 
    type: Number,
    min: 0 
  },
  creator: { type: String },
  created: {
    type: Date,
    default: Date.now
  }
})


const Recipe = mongoose.model("Recipe", recipeSchema);

// we export the model to make it accessible in other files
module.exports = Recipe;

// ITERATION 2 - CREATE A RECIPE

Recipe.create({
  title: "Gallo Pinto",
  level: "Easy Peasy",
  ingredients: ['1 (16-ounce) bag dried small red or black beans', 'Salt', '7 garlic cloves, peeled', '1/4 cup vegetable oil, divided', '1 medium yellow onion, finely chopped (about 1 cup), divided', '1 1/2 cups long-grain white rice', '3 cups water or low-sodium chicken broth', '1/2 green bell pepper, cored and seeded'],
  cuisine: 'Nicaraguan',
  dishType: 'Breakfast',
  image: 'https://www.seriouseats.com/recipes/images/2012/05/20120521-127677-LatAmCuisine-Gallopinto-PRIMARY.jpg',
  duration: 45,
  creator: 'William Fiallos'
  // created: Date.now
})
.then( (newRecipe) => { 
  console.log('Recipe title: ', recipe.title)
})
.catch( (err) => {
  console.log('Error ocurred when creating recipe: ', err)
})

// ITERATION 3 - INSERT MANY RECIPES

Recipe.insertMany( data ) 
.then( (newRecipe) => {
  console.log('Recipe title is: ', data.title)
})
.catch ( (err) => {
  console.log('Error ocurred when inserting many recipe: ', err)
})

