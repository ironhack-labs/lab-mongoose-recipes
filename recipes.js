const mongoose = require("mongoose");
const Recipe = require("./models/recipe.model");
const recipes = require("./data.js");

require("./configs/db.config");

const recipe = {
  title: "Beef and Pepper Stir Fry",
  level: "Amateur Chef",
  ingredients: [
    "8 oz beef strips",
    "2 teaspoons corn flour",
    "1 small onion",
    "1/2 red pepper",
    "1/2 green pepper",
    "2 tablespoons vegetable oil",
    "1 teaspoons minced garlic",
    "1 teaspoons minced ginger",
    "1/2 cup water"
  ],
  cuisine: "Fusion",
  dishType: "Dish",
  image: "http://www.iaba.com/cookbook/images/recipe_19.png",
  duration: 37,
  creator: "Valentina Kulma"
};

Recipe.create(recipe)
  .then(recipe => {
    console.info("========== Iteration 2");
    console.info("- Created recipe", recipe.title);
    return Recipe.insertMany(recipes);
  })
  .then(recipes => {
    console.info("========== Iteration 3");
    for (let recipe of recipes) {
      console.info("- Created recipe", recipe.title);
    }
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    );
  })
  .then(recipe => {
    console.info("========== Iteration 4");
    console.info(`${recipe.title} successfully updated!`);
    return Recipe.findOneAndRemove({ title: "Carrot Cake" });
  })
  .then(recipe => {
    console.info("========== Iteration 5");
    console.info(`${recipe.title} successfully removed!`);
  })
  .catch(error => console.error(error))
  .then(() => {
    console.info("========== Cleaning database...");
    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    console.info("========== Closing database...");
    return mongoose.connection.close();
  })
  .catch(error => console.error(error));
