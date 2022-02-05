const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then((recipes) => {
    console.log("All recipes deleted.");
    console.log("==================");
    // Recipe.create(data[0]).then(result => console.log(result))
    return Recipe.insertMany(data);
  })
  .then((result) => {
    console.log("ITERATION 2: LISTING ALL RECIPES");
    result.forEach((result, index) => console.log(index, ":", result.title));
    console.log("==================");
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((foundRecipe) => {
    console.log("ITERATION 3: find and update recipe");
    console.log(foundRecipe.title, "has a new duration:", foundRecipe.duration);
    console.log("=======================");
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((returnedRecipe) => {
    console.log("ITERATION 4: find and update recipe");
    console.log("Deleted:", returnedRecipe.title);
    console.log("=======================");
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
