const express = require("express");

const mongoose = require("mongoose");

const Recipes = require("./recipes.js");


// create new database for new app
// connect to database using a CONNECTION STRING
// (domain and all info about database we are connecting to)
mongoose.connect("mongodb://localhost/recipeApp");

const app = express();

app.set("view engine", "hbs");

app.listen(3000, () => {
  console.log ("YUM 🐒")
})

