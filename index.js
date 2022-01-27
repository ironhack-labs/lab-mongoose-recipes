const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      title: "IronHack Pie2",
      level: "Easy Peasy",
      ingredients: ["Pie", "Pie filling", "Green Vegetables", "Eggs"],
      cuisine: "Spanish",
      dishType: "main_course",
      duration: 60,
      creator: "Team1",
    };

    // console.log(Recipe.find({ title: newRecipe.title }));
    // console.log(Recipe.countDocuments({ title: newRecipe.title }));

    Recipe.countDocuments({ title: newRecipe.title })
      .then((count) => {
        if (count === 0) {
          Recipe.create(newRecipe)
            .then((recipe) =>
              console.log("this is added recipe: " + recipe.title)
            )
            .catch((error) =>
              console.log("An error happened while saving a new recipe:", error)
            );
        } else {
          console.log("recipe already exists");
        }
      })

      .catch((error) => {
        console.log(error);
      });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
