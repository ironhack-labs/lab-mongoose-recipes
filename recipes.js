const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./Recipe");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({ title: "Pfannkuchen", level: "UltraPro Chef", cuisine: "Deutsch", creator: "Freja & Roberta" })
  .then(recipe => {
    console.log("The recipe is saved and its title is: ", recipe.title);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log("The recipe is saved and its title is: ", recipe.title);
    });
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(() => {
    console.log("The new duration is 100");
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.remove({ title: "Carrot Cake" })
  .then(() => {
    console.log("The Carrot Cake was removed!");
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

setTimeout(() => {
  mongoose.disconnect();
  console.log("Database closed!");
}, 5000);
