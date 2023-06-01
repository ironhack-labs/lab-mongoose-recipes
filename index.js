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
      title: "Pasta a la Diogo et Carol",
      level: "Easy Peasy",
      ingredients: [
        "linguini",
        "tomatoes",
        "oil",
        "salt and pepper",
        "mozzarella",
      ],
      cuisine: "Portuguese-German",
    };
    console.log("Diogo and Caroline Lunch Pasta");
    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log(createdRecipe.title);

    return Recipe.insertMany(data); // Using the data from data.json
  })
  .then((insertedRecipes) => {
    console.log("Inserted the following recipes:");
    insertedRecipes.forEach((recipe) => {
      console.log(recipe.title);
    });
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Recipe updated successfully");

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe deleted");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
