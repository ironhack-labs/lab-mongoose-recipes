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

//Iteration 1 - Recipe Schema
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

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

//Iteration 2 - Create a recipe
Recipe.create({
  title: "myRecipe",
  level: "Amateur Chef",
  ingredients: ["javascript", "mongoose", "express"],
  cuisine: "webdev",
  dishType: "Drink",
  duration: 1
})
  .then(Recip => {
    console.log("The recipe is created and its title is: ", Recip.title);
  })
  .catch(err => {
    console.log("An error occurred:", err);
  });

//Iteration 3 - Insert Many recipes
Recipe.insertMany(data)
  .then(() => {
    console.log("Thes recipes are saved");
  })
  .catch(err => {
    console.log("An error occurred:", err);
  });

//Iteration 4 - Update recipe
Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(() => {
    console.log("The recipe is updated");
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

//Iteration 5 - Remove a recipe & Iteration 6 - Close the Database
Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => {
    console.log("The recipe is deleted");
  })
  .catch(err => {
    console.log("An error occured", err);
  })
  .then(() => {
    mongoose.connection.close();
    console.log("Closed with success");
  });
