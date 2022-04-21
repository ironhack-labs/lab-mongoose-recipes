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
    const newRecipe = {
      title: "Black Pudding",
      level: "Easy Peasy",
      cuisine: "Scottish",
    };
    return Recipe.create(newRecipe);
  })
  .then((newestRecipe) => {
    console.log("A new receipe has been added called " + newestRecipe.title);
  })
  .then(() => {
    data.forEach((recipe) => {
      Recipe.insertMany(recipe);
    });
    return;
  })
  .then(() => {
    data.forEach((recipe) => {
      console.log("A new receipe has been added called " + recipe.title);
    });
    return;
  })
  .then(() => {
    Recipe.findByIdAndUpdate(
      "62616db81b098b6c6554dd76",
      { duration: 100 },
      { returnDocument: "after" }
    );
    return;
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" });
    return;
  })
  .then(() =>{
    console.log("A receipe hasd been deleted")
    mongoose.connection.close()
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

  // const promiseOne = Recipe.deleteOne({ title: "Carrot Cake" })
  // const promiseTwo =  Recipe.findByIdAndUpdate(
  //   "62616db81b098b6c6554dd76",
  //   { duration: 100 },
  //   { returnDocument: "after" }
  // )
  
  //   const promises = [
  //   promiseOne, 
  //   promiseTwo
  // ]



// Promise.all(promises).then(() => {

// })