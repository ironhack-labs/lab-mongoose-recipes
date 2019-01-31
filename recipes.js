const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

Recipe.create ({
  title: 'Orange and Milk-Braised Pork Carnitas',
  level: 'UltraPro Chef',
  ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
  cuisine: 'American',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
  duration: 160,
  creator: 'Chef John'
})
  .then(() => {
    console.log(data.title); 
  }).catch((err) => {
    console.error('Error creating recipe', err);
  });

Recipe.insertMany (data)
  .then(() => {
    console.log(data.title); 
  }).catch((err) => {
    console.error('Error inserting all data', err);
  });

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => {
    console.log('The recipe has been updated with success!');
  }).catch((err) => {
    console.error('Error updating recipe', err);
  });

Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => {
    console.log('The recipe has been deleted');
  }).catch((err) => {
    console.error('Error deleting recipe', err);
  });

mongoose.connection.close();
