const mongoose = require("mongoose");
// Iteration 3 = Importing the data sets from the JSON
const recipes = require("./data.json");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

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
    // Iteration 2 - Running and Individual Recipe
    return Recipe.create({
      title: "Mongolian Legendary Soup",
      level: "Amateur Chef",
      ingredients: ["soup", "cabish", "spicystuff"],
      cuisine: "Mongolian",
      dishtType: "breakfast",
      duration: 23,
      creator: "Guillermo",
    });
  })
  .then((createdRecipe) => {
    console.log("Recipe:", createdRecipe.title);
  })
  // Iteration 3 - Inserting all the files from the data.json
  .then(() => {
    return Recipe.insertMany(recipes);
  })
  // Iteration 4 - Finding the value and updating it and printing a console log if successfull
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      {
        duration: 100,
      }
    );
  })
  .then((updatedRecipe) => {
    console.log("Updated the", updatedRecipe.title, "recipe");
  })
  // Iteration 5 - Removing a recipe and printing a message after deleting it
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    console.log("Deleted recipe is of course,", deletedRecipe.title);
  })

  //Iteration 6 - Closing the connection after everything was executed
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
