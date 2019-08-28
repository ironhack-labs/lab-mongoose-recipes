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

Recipe.create({
  title: "oatmeal",
  level: "Easy Peasy",
  ingredients: ["oats", "protein powder", "milk", "berries"],
  cuisine: "Belgian",
  dishType: "Breakfast",
  duration: 20,
  creator: "Henri"
})
  .then(recipe => {
    console.log("The Recipe is saved and its value is: ", recipe.title);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.insertMany(data, function(err, recipes) {
  if (err) {
    console.log("An error happened:", err);
  } else {
    recipes.forEach(recipe => {
      console.log(recipe.title);
    });
  }
});

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(res => console.log("success update"))
  .catch(err => console.log("failed update"));

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(res => console.log("succes delete carrot cake"))
  .catch(err => console.log("failed delete carrot cake"));

mongoose.connection.close();
