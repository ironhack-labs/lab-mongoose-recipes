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

let recepte = {
  title: "Tortilla",
  level: "Easy Peasy",
  ingredients:  "Huevos",
  cuisine: "española",
  dishType: "Dish",
  duration: 5,
  creator: "Pep",
};

Recipe.create(recepte, (err, result) => {
  if (err) console.log(err);
  else console.log("Document inserted", result);
});
