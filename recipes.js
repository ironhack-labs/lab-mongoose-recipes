const mongoose = require("mongoose");
const data = require("./data.js");
const Recipe = require("./recipeModel.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create(
  {
    title: "Tiramisu",
    level: "Amateur Chef",
    ingredients: [
      "1/2 cup heavy whipped cream",
      "3 large egg",
      "2 tablespoons milk",
      "1 1/4 teaspoons vanilla extract",
      "1 cup mascarpone",
      "1 pack of boudoirs biscuits",
      "3 cup of strong coffee"
    ],
    cuisine: "Italian",
    dishType: "Dessert",
    image:
      "https://www.biggerbolderbaking.com/wp-content/uploads/2018/01/1C5A3553-150x150.jpg",
    duration: 30,
    creator: "Chef Merwan"
  },
  function(err, recipe) {
    if (err) {
      console.log("An error happened:", err);
    } else {
      console.log("The recipe is saved and its title is: ", recipe.title);
    }
  }
);

Recipe.insertMany(data, function(err, data) {if (err) {
  console.log("An error happened:", err);
} else {
  console.log("Imported recipes ", data.length );
}});