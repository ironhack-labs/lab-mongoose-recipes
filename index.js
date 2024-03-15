const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

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
      title: "cheesecake",
      level: "Easy Peasy",
      ingredients: ["milk", "cheese,cookies "],
      cuisine: "French",
      dishType: "main_course",
      image: "URL de la imagen",
      duration: 60,
      creator: "Mario",
      created: new Date(),
    };
    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log(`Recipe "${createdRecipe.title}" created successfully!`);
    return Recipe.insertMany(data);
  })
  .then((insertedRecipes) => {
    insertedRecipes.forEach((recipe) => {
      console.log(`Recipe "${recipe.title}" inserted successfully!`);
    });

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log(
      `Duration of recipe "${updatedRecipe.title}" updated successfully!`
    );

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Carrot Cake recipe deleted successfully!");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
