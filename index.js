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
  // Run your code here, after you have insured that the connection was made
//Recipe.create({
//  title: "Sandwich mixto con huevo",
//  level: "Easy Peasy",
//  ingredients: [
//    "pan de molde",
//    "mantequilla o queso de untar",
//    "jamon york",
//    "queso en lonchas",
//    "huevo",
//  ],
//  cuisine: "Mediterránea",
//  dishType: "other",
//  image: "https://images.media-allrecipes.com/images/75131.jpg",
//  duration: 15,
//  creator: "Eduard",  
//}).then(recipe => console.log(recipe.title));
  })
 .then(recipe => console.log(recipe.title))
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
