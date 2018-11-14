const Recipe = require("./models/recipes");
const mongoose = require("mongoose");
const data = require("./data.js");

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
  title: "Tortilla",
  level: "Easy Peasy",
  ingredients: ["huevos", "patata", "cebolla", "sal", "aceite de oliva"],
  cuisine: "mediterranea",
  dish: "Snack",
  duration: 20,
  creator: "edu"
})

  .then(recipe => {
    console.log(recipe.title);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });
