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
    return Recipe.deleteMany();
  })
  .then(() => {
    const spaghettiBolognese = {
      title: "Spaghetti Bolognese",
      level: "easy peasy",
      ingredients: ["pasta", "tomato sauce", "minced meat"],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 20,
      creator: "The italian people",
    };
    return Recipe.create(spaghettiBolognese);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
