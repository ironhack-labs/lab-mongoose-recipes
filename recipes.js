const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')



// Set up Schema
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true},
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
})

// Compile model insertMany
const Recipe = mongoose.model("Recipe", recipeSchema);

//to use the model
Recipe.insertMany(data//{
  /*title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cousine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
}*/)
  .then((recipe) => {
    console.log("New recipe inserted!", recipe[0].title)
  })
  .catch(err => {
    console.log("An error is caught!", err)
  });


//Connect to the DB
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });