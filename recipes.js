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
    Recipe.create({
      title:"Beef Strogonoff",
      level:"Amateur Chef",
      ingredients:["beef", "onion", "bacon", "rice","wine"],
      cuisine:"Russian",
      dishType:"Dish",
      image:"Strogonoff",
      duration:60,
      creator:"Sofia",
      created:"14-11-2018"
    })
    Recipe.insertMany(data)
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
