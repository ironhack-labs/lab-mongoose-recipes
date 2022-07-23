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
    const recipeCreated = Recipe.create({
      title: "Pizza",
      level: "Amateur Chef",
      ingredients: "Tomato, cheese, dough",
      cuisine: "Italian",
      dishType: "Main Dish",
      image:
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      duration: 30,
      creator: "John Doe",
    });
    return recipeCreated;
  })
  .then((recipeCreated) => {
    console.log(`Recipe title: ${recipeCreated.title}`);
    const allRecipesCreated = Recipe.insertMany(data);
    return allRecipesCreated;
  })
  .then((allRecipesCreated) => {
    allRecipesCreated.forEach((recipe) => {
      console.log(`Inserted Recipe title: ${recipe.title}`);
    });
    const updatedRecipe = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    return updatedRecipe;
  })
  .then((updatedRecipe) => {
    console.log(`Updated recipe title: ${updatedRecipe.title}`);
    const deletedRecipe = Recipe.findOneAndDelete({ title: "Carrot Cake" });
    return deletedRecipe;
  })
  .then((deletedRecipe) => {
    console.log(`Deleted recipe title: ${deletedRecipe.title}`);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Connection to the database closed");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
