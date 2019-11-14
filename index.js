const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'
const index = express();
// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create(
  {
    title: "Birria",
    level: "Easy Peasy",
    ingredients: ["Musho shivo"],
    cuisine: "Mexican",
    dishType: "Dish",
    image: "",
    duration: 180,
    creator: "Someone",
    created: ""
  },
  function(err, recipe) {
    if (err) {
      console.log("An error happened:", err);
    } else {
      console.log(Recipe.title);
    }
  }
);

Recipe.insertMany(data, function(error, data) {});

Recipe.updateOne(
  {
    title: "Rigatoni alla Genovese"
  },
  {
    duration: 100
  }
)
  .then(() => console.log("successful update"))
  .catch(err => console.log(`something happened: ${err}`));

Recipe.deleteOne({
  name: "Carrot Cake"
})
  .then(() => console.log("successful update"))
  .catch(err => console.log(`something happened: ${err}`));

mongoose.connection.close();

index.listen(3000, () => console.log("http://localhost:3000"));
