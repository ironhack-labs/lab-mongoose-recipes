const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
console.log(data.length);

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect("mongodb://127.0.0.1:27017/recipe-app")
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: data[0].title,
      level: data[0].level,
      ingredients: data[0].ingredients,
      cuisine: data[0].cuisine,
      dishType: data[0].dishType,
      image: data[0].image,
      duration: data[0].duration,
      date: data[0].creator,
    };
    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log("Recipe title:", createdRecipe.title);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
