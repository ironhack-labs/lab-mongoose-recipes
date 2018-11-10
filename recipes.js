const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const Recipe = require('./recipe');
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp", {useNewUrlParser: true})
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const createRecipe = () => {
  Recipe.create();
};
