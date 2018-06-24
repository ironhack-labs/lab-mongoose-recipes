const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  //Iteration 1 - Recipe Schema

  const recipeSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef" ],
    },
    ingredients: {
      type: Array,
    },
    cousine: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
      enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: {
      type: Number,
      min: 0,
    },
    creator: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    }
  });

  //Iteration 2 - Create a recipe

  const Recipe = mongoose.model("Recipe", recipeSchema);

  Recipe.create({ 
    title: "Bocata", 
    level: "Easy Peasy", 
    ingredients: ["Bread", "Spanish Ham", "Olive Oil", "Tomato"],
    cousine: "Spanish",
    dishType: "Snack",
    image: "https://cdn.shopify.com/s/files/1/1589/5089/articles/Razones_comer_jamon_2_1024x1024.jpg?v=1527165180",
    duration: 10,
    creator: "Spanish ancestors",
    date: ("01.01.1700"),
  },
  function (err, Bocata){
    if (err) return handleError(err);
  });
  console.log(Recipe.title)

