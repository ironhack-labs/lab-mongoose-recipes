const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const recipeDoc = {
  title: "Ramadan",
  cuisine: "Expert chef",
};

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
    // Iteration 2
    return Recipe.create(recipeDoc);
  })

  // Iteration 3
  .then((recipe) => {
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })

  .then((allRecipes) => {
    allRecipes.forEach((recipe) =>
      console.log(`recipe for ${recipe.title} uploaded succefully`)
    );
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })

  // Iteration 4
  .then((updatePasta) => {
    console.log("Successfully Updated!");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  // Iteration 5
  .then((removeCarrots) => {
    console.log("No More Carrots!");
    mongoose.connection.close();
  })

  .then((closing) => {
    console.log("Connection Closed!");
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
    console.log("Connection Closed!");
  });
