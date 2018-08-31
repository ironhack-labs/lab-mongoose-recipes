const chalk = require("chalk");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const express = require("express");
//const app = express;
//app.set("view engine", "hbs");

const Recipe = require("./recipes-model.js");

mongoose
  .connect(
    "mongodb://localhost/recipeApp",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//------------------------RECIPE CREATE ------------------------

Recipe.create({
  title: "naan bread",
  level: "Easy Peasy",
  cousine: "Indian",
  dishType: "Dish",
  duration: 15
})
  .then(recipeDoc => {
    console.log(chalk.yellow(`${recipeDoc.title}`));
  })
  .catch(err => {
    console.log(chalk.yellow("Chicken curry turned out bad", err));
  });

Recipe.insertMany(data)
  .then(res => {
    res.forEach(oneRecipe => console.log(`${oneRecipe.title}😎😝`));
  })
  .catch(err => {
    console.log("bad bad bad"), err;
  });

//-------------------- UPDATE -----------------------

Recipe.findByIdAndUpdate("5b893c4e20d7ad1b59829d52", {
  $set: { duration: 100 }
})
  .then(res => console.log("SUCCESS!!!!"))
  .catch(err => {
    "better luck next time", err;
  });

//------------------------REMOVE ---------------------------

Recipe.findByIdAndRemove("5b893c4e20d7ad1b59829d51")
  .then(res => console.log("success!! 🚫🥕"))
  .catch(err => {
    console.log("time to eat your 🥕", err);
  });
