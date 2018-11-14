const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

const recipesSchemas = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"] },
  image: { type: String, default: " https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
})
const Recipe = mongoose.model("Recipe", recipesSchemas)

module.exports = Recipe;

mongoose.connect('mongodb://localhost/recipeApp')
.then(() => {
  console.log('Connected to Mongo!');
  return Recipe.collection.drop()
  })
  .then(()=>{

    return Recipe.create({
      title: "Beef Strogonoff",
      ingredients: ["beef", "onion", "bacon", "rice", "wine"],
      cuisine: "Russian",
      dishType: ["Dish"],
      image: "Strogonoff",
      duration: 120,
      creator: 'Chef Sofi',
      level: "Amateur Chef",
    })
  }) 
  .then(()=>{
    Recipe.insertMany(data)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });
