const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./models/Recipe");
const dbURL = "mongodb://localhost/recipeApp";

mongoose
  .connect(dbURL)
  .then(() => {
    console.log(`Connected to: ${dbURL}`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create(
  {
    title: "Macarrones con chorizo",
    level: "Easy Peasy",
    ingredients: ["macarrones", "tomate", "chorizo", "queso"],
    cousine: "mediterranea",
    dishType: "Dish",
    image:
      "https://cocinandoentreolivos.com/2015/01/como-hacer-macarrones-con-chorizo.html",
    duration: 20,
    creator: "David & Luna"
  },
  (err, recipe) => {
    if (err) console.log(`An error happened ${err}`);
    else console.log(`RECIPE CREATED ${recipe}`);
  }
);
