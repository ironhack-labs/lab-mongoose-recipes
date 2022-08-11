const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const recipeObj = {
  title: "Spaghettie bolognese",
  level: "Easy Peasy",
  ingredients: ["Pasta", "Tomatoe sauce", "Meat"],
  cuisine: "Modern",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 120,
  creator: "Clark",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

const saveNewRecipe = () => {
  const newRecipe = new Recipe(recipeObj);

  newRecipe
    .save()
    .then((results) => console.log(`Saved new recipe: ${results}`))
    .catch((saveErr) => console.error(`Save failed: ${saveErr}`));
};

// saveNewRecipe();

const saveManyNewRecipes = () => {
  Recipe.insertMany(data)
    .then((results) => console.log(`Saved new recipes: ${results}`))
    .catch((saveErr) => console.error(`Save failed: ${saveErr}`));
};

// saveManyNewRecipes();

const updateRecipe = () => {
  Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" },
    { duration: 100 }
  )
    .then((results) => console.log("Recipe is updated"))
    .catch((saveErr) => console.error(`Error`));
};

// updateRecipe();

const removeRecipe = () => {
  Recipe.findOneAndRemove({ title: "Carrot Cake" })
    .then((results) => console.log("Recipe is removed"))
    .catch((saveErr) => console.error(`Error`));
};

// removeRecipe();
