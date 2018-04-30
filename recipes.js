const mongoose = require('mongoose');
const data = require('./data');

/****************************************
 * Tell mongoose to connect to my mongoDB
 ****************************************/
mongoose
  .connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

/***********************
 * Create Schema
 ***********************/
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  level: String,
  ingredients: [String],
  cuisine: String,
  dishType: String,
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: Number,
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
});

/***********************
 * Create Model
 ***********************/
const Recipe = mongoose.model('Recipe', recipeSchema);

/***********************
 * Custom Recipe
 ***********************/
// Recipe.create({
//   title: 'Tacos',
//   level: 'Amateur chef',
//   ingredients: ['Tortilla', 'Tomatoes', 'Cheese', 'chicken'],
//   cuisine: 'Mexican',
//   dishType: 'Dish',
//   image: 'https://www.deltaco.com/files/menu/item/thumb_flatbreadtaco.jpg',
//   duration: 15,
//   creator: 'Chef Ruben'
// });

/***********************
 * Insert Recipes -- w/o promises
 ***********************/
Recipe.insertMany(data, (err, recipe) => {
  if (err) {
    console.log(err);
  } else {
    console.log(recipe);
  }
});

/***********************
 * Update recipe
 ***********************/

Recipe.updateOne({ duration: 220 }, { $set: { duration: 100 } });

/***********************
 * Remove recipe - w/ promises
 ***********************/
Recipe.findByIdAndRemove('5ae2261b35a8f62f1c0bb01b')
  .then(recipe => {
    console.log(`Congrats!! ${recipe.title}`);
  })
  .catch(err => {
    console.log('An error occurred:', err);
  });