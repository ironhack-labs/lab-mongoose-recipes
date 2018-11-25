const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//1. Create a schema for the recipes
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});
// 2. Create a recipe object that I can crud 
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

// 3. Create a recipe 
var createOneRecipe = Recipe.create({
  title: "Risotto",
  level: "Easy Peasy",
  ingredients: ["riz", "wine", "mushrooms"],
  cuisine: "italian",
  dishType: "Dish",
  duration: "30",
  creator: "Sandra et Rita"
})
  .then(() => console.log("Risotto created"))
  .catch(() => console.log("error creating the risotto"));

// 3. Insert many recipes. When it's done, update a recipe and remove another one. 
var insertAll = Recipe.insertMany(data)
  .then(() => {
    console.log("All recipes inserted");
    var updateOneRecipe = Recipe.updateOne({ title: "Rigatoni alla Genovese" },{ duration: "100" })
      .then(() => console.log("One recipe successfully updated"))
      .catch(() => console.log("error updating a recipe"));

    var deleteOneRecipe = Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log("One recipe successfully deleted"))
      .catch(() => console.log("Error deleting a recipe"));

    // wait for these 2 promises to end before closing the database
    return Promise.all([updateOneRecipe, deleteOneRecipe]);
  })
  // close the database
  .then(() => {
    mongoose.connection.close();
    console.log("Database closed");
  })
  .catch( () => console.log("Error closing the database"))



  /* 
  node recipes.js : 
  _______________________________
  Connected to Mongo!
  Risotto created // All recipes inserted
  All recipes inserted // Risotto created
  One recipe successfully updated
  One recipe successfully deleted
  Database closed
  */