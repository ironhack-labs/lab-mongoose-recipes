const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

app.listen(8888, () => {
  console.log("Recipe server READY!");
});

const recipeSchema = new Schema({
  title: { type: String, required: true },
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
    match: /^https?:\/\//
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: [Date]
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
