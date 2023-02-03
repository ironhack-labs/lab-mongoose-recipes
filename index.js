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
    Recipe.create(data[0])
      .then((createdRecipe) => console.log(createdRecipe))
      .catch((error) =>
        console.error("Error connecting to the database", error)
      );
    Recipe.insertMany([...data])
      .then((createdRecipes) => console.log(createdRecipes))
      .catch((error) =>
        console.error("Error connecting to the database", error)
      );

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then((recipe) => console.log(recipe))
      .catch((err) => console.log(err));
    // return Recipe.deleteMany();
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then((createdRecipes) => console.log(createdRecipes))
      .catch((error) =>
        console.error("Error connecting to the database", error)
      );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    // Close connection
    mongoose.connection.close();
  });
