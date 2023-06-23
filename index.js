const mongoose = require("mongoose");

// Import the Recipe model from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connect to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to the database: "${mongoose.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // single new recipe
    const newRecipe = {
      title: "French Toast",
      level: "Easy Peasy",
      ingredients: [
        "White Bread",
        "Eggs",
        "Milk",
        "Vanilla and Cinnamon",
        "Salt",
        "Butter",
      ],
      cuisine: "American",
      dishType: "Breakfast",
      duration: 10,
      creator: "Danilo",
    };

    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log("New recipe created:", createdRecipe.title);
    // multiple recipes from data array
    return Recipe.insertMany(data);
  })
  .then((createdRecipes) => {
    console.log("Multiple recipes inserted:", createdRecipes.length);
    // Update the "Rigatoni alla Genovese" recipe duration
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log("Recipe updated successfully:", updatedRecipe.title);
    // Delete the "Carrot Cake" recipe
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe deleted successfully: Carrot Cake");
    // Close the database connection
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error:", error);
    // Close of the Database connection
    mongoose.connection.close();
  });
