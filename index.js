const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
const newRecipe = require("./data.json");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipeOne = {
      title: "Sushi",
      level: "Amateur Chef",
      ingredients: ["rice", "salmon", "cucumber", "nori sheet"],
      cuisine: "Japonese",
      dishType: "snack",
      image: "delicious sushi",
      duration: 45,
      creator: "CaroLina",
      created: Date("2023-06-01"),
    };
    return Recipe.create(recipeOne);
  })
  .then((newRecipe) => {
    console.log(newRecipe)
    return Recipe.insertMany({newRecipe}, {title});
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
