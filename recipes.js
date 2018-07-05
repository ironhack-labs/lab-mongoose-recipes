const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipesSchema = new Schema({
    title : String,
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'Ultrapro Chef'] },
    ingredients  : [String],
    cusine: { type: String, required: true},
    dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number, min: 0},
    creator: String,
    created: {
      type: Date,
      default: Date.now,
    }
  });

  const Recipes = mongoose.model('Recipes', recipesSchema);

  const newRecipe = {
    title : 'Gnocchi pomodoro',
    level: 'Ultrapro Chef',
    ingredients  : ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
    cusine: 'Italian',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/images/75131.jpg',
    duration: 130,
    creator: 'Kahlil',
    created: {
      type: Date,
      default: Date.now,
  }

  Recipes.create({})

  console.log(recipesSchema.title);

