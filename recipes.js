const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, 
  enum: ['Easy Peasy',  'Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cuisine:{ type: String, required: true },
  dishType: {type: String, 
  enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert','Other']},
  image: String,
  duration: {type:Number, min: 0},
  creator: String,
  created: { 
    type: Date,
    default: Date.now
  },
})

const Recipe = mongoose.model('Recipe', recipeSchema);

async function exercise() {
  await mongoose.connect('mongodb://localhost/recipeApp');
  console.log('Connected to Mongo!');  
  await Recipe.create({
    title: 'Lasagne',
    level: 'Amateur Chef',
    ingredients: ['tomato sauce', 'pork meat', 'cream', 'onion'],
    cuisine: 'italian',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/images/75131.jpg.',
    duration: 60,
    creator: 'John Doe',
  })
  const recipes = await Recipe.insertMany(data);
  recipes.forEach((recipe) => console.log(recipe.title));
}

exercise().catch(err => {
  console.error('Error', err);
});
