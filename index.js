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
    //Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  //Iteration 2
  .then(() => {
    const newRecipe = {
      title: "Mashed Potatoes",
      cuisine: "American",
    };
    return Recipe.create(newRecipe);
  })
  .then((result) => {
    console.log(result.title);
  })
  //Iteration 3
  .then(() => {
    const recipes = Recipe.insertMany(data);
    return recipes;
  })
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
  })
  //Iteration 4
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then((result) => {
    console.log(result.title + " is updated");
  })
  //Iteration 5
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe is successfully deleted");
  })
  //Iteration 6
  .then(() => {
    mongoose.connection.close();
  })
  .then(() => {
    console.log("Mongoose was succesfully closed");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
