const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
console.log(Recipe);

Recipe.create(
  {
    title: "PB&J",
    level: "Easy Peasy",
    ingredients: ["bread", "peanut butter"],
    cuisine: "French",
    dishType: "Snack",
    duration: 15,
    creator: "Me"
  },
  (err, recipe) => {
    if (err) {
      console.log("An error happened:", err);
    } else {
      console.log("The recipe is saved and its value is: ", recipe.title);
    }
  }
);

// Recipe.insertMany(data);

Recipe.findByIdAndUpdate("5cc31f0380109c0c651f38da", { duration: 100 })
  .then(console.log("Recipe updated!"))
  .catch(error => console.log("burned out", error));

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(console.log("carrot cake removed"))
  .catch(error => console.log(error));
