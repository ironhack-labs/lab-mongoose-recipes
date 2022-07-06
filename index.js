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
    // return Recipe.deleteMany();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

Recipe.deleteMany()
  .then(() => {
  console.log("Recipes database deleted");
  })
  .catch((error) => {
  console.error("Error deleting the database", error);
  })

// ITERATION 2
Recipe.create({
  title: "Spanish Omelette",
  level: "Easy Peasy",
  ingredients: ["Eggs", "Potatos", "Onions", "Olive oil", "Salt"],
  cuisine: "Spanish",
  dishType: "main_course",
  image:
    "https://cdn1.cocina-familiar.com/recetas/tortilla-de-patata-con-cebolla.jpg",
  duration: 30,
  creator: "Cristobal Colon",
}).then((recipe) => {
  console.log(`Recipe ${recipe.title} created`);
});
