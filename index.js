const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have ensured that the connection was made
    // For example, you can add new recipes using the `Recipe.create()` method
    return Recipe.create();
  })
  .then((createdRecipe) => {
    console.log("Created recipe:", createdRecipe);
    return Recipe.insertMany(data);
  })
  .then((createdRecipes) => {
    console.log("Created recipes:", createdRecipes);
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { $set: { duration: 100 } },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log("Updated recipe:", updatedRecipe);
    return Recipe.deleteOne(
      {title: 'Rigatoni alla Genovese'});
  })
  .then(() => {
  console.log('Success!');
  })
  .then(() =>
  mongoose.connection.close())
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
