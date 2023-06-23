const mongoose = require("mongoose");
const express = require("express");
const app = express();

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const recipesData = require("./data.json");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipeDetails = {
      title: "New Recipe",
      description: "Delicious Egusi",
      cuisine: "italian",
      ingredients: [
        "Redoil",
        "water",
        "fish",
        "meat",
        "pepper",
        "spices",
        "Egusi",
        "salt",
      ],
      instructions: "put water in the pot, mix the egusi with pepper and salt",
    };

    Recipe.create(recipeDetails).then((createdRecipe) => {
      console.log(`Inserted recipe: ${createdRecipe.title}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

Recipe.insertMany(recipesData)
  .then((createdRecipes) => {
    createdRecipes.forEach((recipe) => {
      console.log(`Inserted recipe: ${recipe.title}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("Engine started");
});
