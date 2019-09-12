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

// Iteration 2 - Create a Recipe

let bananaPancakes = {
  title: "Banana Pancakes",
  ingredients: ["bananas", "flour", "sugar", "eggs"]
};

Recipe.create(bananaPancakes).then(console.log(bananaPancakes.title));

// Iteration 3 - Insert Many Recipes

Recipe.insertMany(data)
  .then(data => {
    data.forEach(meal => {
      console.log(meal.title);
    });
  })
  .catch(err => {
    console.log({ err: err });
    throw err;
  });

// Iteration 4 - Update Recipe

let target = { duration: 220 };

Recipe.findOneAndUpdate(target, { duration: 100 })
  .then(console.log("success"))
  .catch(err => {
    console.log({ err: err });
    throw err;
  });

// Iteration 5 - Remove a Recipe

let deleteTarget = { title: "Carrot Cake" };

Recipe.deleteOne(deleteTarget)
  .then(console.log(`success`))
  .catch(err => {
    console.log({ err: err });
    throw err;
  });

// Iteration 6 - Close the Database

mongoose.disconnect().then(console.log(`database disconnected`));
