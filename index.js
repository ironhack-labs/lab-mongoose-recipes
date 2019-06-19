const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({
  name: "Pizza",
  level: "Easy Peasy",
  ingredients: ["Tomat", "peeper"],
  cuisine: ["xls", "lls"],
  dishType: ["Breakfast"],
  image: "https://images.media-allrecipes.com/images/75131.jpg.",
  duration: 10,
  creator: "one",
  created: new Date()
});

var recette2 = {
  name: "Pastas",
  level: "Easy Peasy",
  ingredients: ["Tomat", "cheese"],
  cuisine: ["xls", "lls"],
  dishType: ["Dish"],
  image: "https://images.media-allrecipes.com/images/75131.jpg.",
  duration: 10,
  creator: "one",
  created: new Date()
};

var recette3 = {
  name: "Pastas Saumon",
  level: "Easy Peasy",
  ingredients: ["Tomat", "salmon"],
  cuisine: ["xls", "lls"],
  dishType: ["Dish!"],
  image: "https://images.media-allrecipes.com/images/75131.jpg.",
  duration: 10,
  creator: "one",
  created: new Date()
};

Recipe.insertMany([recette2, recette3])
  .then(success => {
    console.log("ok");
  })
  .catch(err => {
    console.log("not ok", err);
  });
