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
    //return Recipe.deleteMany();
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 2
    Recipe.create({
      title: "Natillas",
      level: "Easy Peasy",
      ingredients: "leche azucar canela huevos",
      cuisine: "Parla",
      dishType: "dessert",
      duration: 20,
      creator: "Diego",
    }).then((newRecipe) => console.log("Nueva receta", newRecipe.title));
    // Iteration 3
    Recipe.insertMany(data).then((allrecipies) =>
      allrecipies.forEach((elm) => console.log(elm.title))
    );
    // Iteration 4
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    // Iteration 5
    // devuelve el objeto borrado
    Recipe.deleteOne({ title: "Carrot Cake" }).then(console.log("Deleted!"));
  })
  // Iteration 6
  .connection.close(function () {
    console.log("Mongoose connection closed");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
