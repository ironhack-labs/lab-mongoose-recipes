const mongoose = require("mongoose");
const express = require("express");

const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./recipe-models.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//  Iteration 2 - Create a recipe
Recipe.create({
  title: "Nasi Goreng",
  level: "Amateur Chef",
  ingredients: [
    "300g long-grain rice",
    "4 large eggs beaten",
    "100g fine green beans",
    "2 chicken breasts,",
    "180g pack large raw peeled prawns",
    "3 tbsp vegetable oil",
    "200g shallots",
    "20g garlic",
    "1 tbsp kecap manis",
    "8 spring onions"
  ],
  cuisine: "Indonesian",
  image:
    "https://img.jakpost.net/c/2016/06/24/2016_06_24_7079_1466755385._large.jpg",
  duration: 15,
  creator: "Chef Raja"
})
  .then(recipeName => {
    console.log(recipeName.title);
  })
  .catch(err => {
    console.log("Failed to create recipe! ########################"), err;
  });

//  Iteration 3 - Insert Many recipes
Recipe.insertMany(data)
  .then(result => {
    console.log("Recipe created", result);
    result.forEach(function(oneRecipe) {
      console.log(oneRecipe.title);
    });
  })
  .catch(err => {
    console.log("FAILURE #%##%##%#%#%#%#%#%#%#", err);
  });

// Iteration 4 - Update recipe
Recipe.findByIdAndUpdate("5c545967e0b7c70b2f6a1e70", {
  $set: { duration: 100 }
})
  .then(recipeDoc => {
    console.log(`update worked ${recipeDoc._id}`);
  })
  .catch(err => {
    console.log("update fail !@^#$%^ ", err);
  });

// Iteration 5 - Remove a recipe
Recipe.findOneAndRemove({ title: { $eq: "Carrot Cake" } })
  .then(recipeDoc => {
    console.log("recipe REMOVED! ");
  })
  .catch(err => {
    console.log("fail, nothing deleted---------", err);
  });
