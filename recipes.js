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

// Iteration 1: Create a Schema
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
    default: /https:\/\// + "images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Iteration 2: Create a Recipe
Recipe.create({ title: "Taco Pie", level: "Easy Peasy", cuisine: "Tex-Mex" })
  .then(recipe => {
    console.log(recipe.title);
  })
  .catch(err => {
    console.log("Recipe CREATE failure! 😭", err);
  });

// Iteration 3: Insert Many Recipes

const hellaRecipesBruh = require("./data.js");

Recipe.insertMany(hellaRecipesBruh)
  .then(theThing => {
    console.log(theThing.title);
  })
  .catch(err => {
    console.log("Recipe CREATE failure! 😭", err);
  });

// Iteration 4: Update

Recipe.updateMany(
  { title: { $eq: "Rigatoni alla Genovese" } },
  { $set: { duration: 100 } }
  // $inc is like the ++ or += operator in JavaScript
)
  .then(result => {
    console.log("Recipe.updateMany() SUCCESS!", result);
  })
  .catch(err => {
    console.log(`Recipe.updateMany() FAILURE! 😱`, err);
  });

// Iteration 5: Delete

Recipe.deleteMany({
  title: { $eq: "Carrot Cake" }
})
  .then(result => {
    console.log("Recipe.deleteMany() SUCCESS!", result);
  })
  .catch(err => {
    console.log(`Recipe.deleteMany() FAILURE! 😱`, err);
  });

// Iteration 6: Close Database
mongoose.connection.close();
