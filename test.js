const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const myRecipe = {
  title: "Thai curry Chicken",
  level: "Easy Peasy",
  ingredients: [
    "garlic",
    "ginger",
    "curryPaste",
    "cocoMilk",
    "basmatiRice",
    "chicken",
  ],
  cuisine: "Thai",
  dishType: "main_course",
  image:
    "https://www.jocooks.com/wp-content/uploads/2016/06/thai-red-chicken-curry-1-8.jpg",
  duration: 25,
  creator: "Hiba Berber",
};

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
    Recipe.create(myRecipe);
  })
  .then((myRecipe) => {
    console.log(myRecipe.title);
  })
  .then(() => {
    const allRecipes = data.push(myRecipe);
    return Recipe;
  })
  .then(() => Recipe.syncIndexes())
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
