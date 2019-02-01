const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./models/recipe-model.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
const app = express();

// Recipe.create({ title: "Blinis", level: "Amateur Chef", cuisine: "Russian" })
//   // then() callbacks if the operation succeeded
//   .then(recipeDoc => {
//     // recipeDoc is the result of our create() query
//     console.log("Recette Crée");
//   })
//   // catch() callbacaks get called if the operation failed
//   .catch(err => {
//     console.log("Echec de la creation");
//   });

// Recipe.insertMany(data)
//   .then(result => {
//     console.log("succes", result);
//     result.forEach(function(oneRecipe) {
//       console.log(oneRecipe.title);
//     });
//   })
//   .catch(err => {
//     console.log("FAILURE", err);
//   });

Recipe.findByIdAndUpdate("5c545967e0b7c70b2f6a1e70", {
  $set: { duration: 100 }
})
  .then(recipeDoc => {
    console.log(`update worked ${recipeDoc._id}`);
  })
  .catch(err => {
    console.log("update fail", err);
  });

Recipe.findOneAndRemove({ title: { $eq: "Carrot Cake" } })
  .then(recipeDoc => {
    console.log(`delete worked `);
  })
  .catch(err => {
    console.log("delete fail", err);
  });
