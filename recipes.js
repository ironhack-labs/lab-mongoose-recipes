const mongoose = require("mongoose");
const data = require("./data.js");
// console.log('TCL: data', data)

const Schema = mongoose.Schema;

// recipe schema
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
  ingredients: [String],
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"] },
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: new Date() }
});

// create Recipe model
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

// create recipe
// Recipe.create({
//   title: "Asian Glazed Chicken Thighs - Test",
//   cuisine: "Asian",
// })
//   .then(recipe => {
//     console.log("The recipe is saved: ", recipe.title);
//   })
//   .catch(err => {
//     console.log("An error happened:", err);
//   });

// insert many recipies
// Recipe.insertMany(data)
//   .then(recipe => {
//     console.log("The recipe is saved: ", recipe.title);
//   })
//   .catch(err => {
//     console.log("An error happened:", err);
//   });

// update recipe
Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(recipe => {
    console.log("Recipe updated");
    console.log("TCL: recipe", recipe);
  })
  .catch(err => console.error("Error connecting to mongo", err));

// remove recipe
Recipe.deleteOne({ title: "Carrot Cake" })
  .then(recipe => {
    console.log("Recipe deleted");
    console.log("TCL: recipe", recipe);
  })
  .catch(err => console.error("Error connecting to mongo", err));

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

setTimeout(() => {
  mongoose.connection.close();

}, 2000)

