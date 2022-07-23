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
    return Recipe.insertMany(data);
  })
  .then((allRecipes) => {
    allRecipes.forEach((recipe) => console.log(recipe.title));
  })
  .then(() => {
    // console.log("ABOUT TO GET A LIST OF ALL OF THE BOOKS");
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ); // Read Operation
  })
  .then((changedDuration) => {
    console.log("success");
  })
  .then(() => {
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  // .then(() => {
  //   return Recipe.create({
  //     title: "Tortilla",
  //     level: "UltraPro Chef",
  //     ingredients: ["onions", "potatoes", "eggs", "olive oil", "secret"],
  //     cuisine: "spanish",
  //     dishType: "snack",
  //     duration: 20,
  //     creator: "Pelayo",
  //   });
  // })
  // .then((createdRecipe) => {
  //   console.log(createdRecipe.title);
  // })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
