const mongoose = require("mongoose");
const createRecipeModel = require("./models/Recipe.model")(mongoose);
const newRecipe = require("./models/new-recipe");
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
const recipesData = require("./data.json");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
    return createRecipeModel.deleteMany();
  })
  .then(() => {
    return newRecipe.createRecipe(createRecipeModel);
  })
  .then(() => {
    return createRecipeModel.insertMany(recipesData);
  })
  .then(() => {
    console.log("Recipes created successfully");

    // Iteration 4 - Update 
    return createRecipeModel.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Rigatoni updated successfully");

    // Iteration 5 - Remove 
    return createRecipeModel.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Carrot Cake removed successfully");

    // Iteration 6 - Close
    mongoose.connection.close();
    console.log("Database connection closed");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
