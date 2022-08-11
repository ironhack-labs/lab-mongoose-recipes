const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const allRecipes = require("./data.json");

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

    //Iteration 2 - Create a recipe

    return Recipe.create({
      title: "Mongo Soup",
      level: "Easy Peasy",
      ingredients: [
        "chicken",
        "carrots",
        "coconut milk",
        "spice peppers",
        "butter",
        "cilantro",
      ],
      cuisine: "Mongoose",
      dishType: "soup",
      duration: 60,
      creator: "Mongo DB",
    });
  })

  .then((newRecipe) => {
    console.log("Recipe Title: ", newRecipe.title);
  })

  //Iteration 3 - Insert multiple recipes from data.json

  .then(() => {
    return Recipe.insertMany(allRecipes);
  })

  .then((recipes) => {
    console.log(" All Recipes: ", recipes);
  })

  //Iteration 4 - Update recipe

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then((updatedRecipe) => {
    console.log("Got it! You've updated the ", updatedRecipe.title, "recipe.");
  })

  // Iteration 5 - Remove a recipe

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    console.log("Sorry the", deletedRecipe, "recipe in no available. :(");

    //I don't undertand this part because when I console, appears in the deletedRecipe the folowing mensage:
    // Sorry the { acknowledged: true, deletedCount: 1 } recipe in no available. :(
    // How can I print the title of the recipe that was deleted???
  })

  //Iteration 6 - Close the Database

  .then(() => {
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
