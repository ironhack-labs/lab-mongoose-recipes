const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect("mongodb://127.0.0.1:27017/recipes")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// Creates a new Recipe, using the data from ou json file
//  1. Inser new Recipe to data base
// const newRecipe = new Recipe(data[0]);
// for (let i = 0; i < data.length; i++) {
//   const newRecipe = new Recipe(data[i]);
//   newRecipe
//     .save()
//     .then((savedRecipe) => console.log("savedRecipe: ", savedRecipe))
//     .catch((err) => {
//       console.log(err);
//     });
// }

// -----------------------------------------------------

//  1. Insert new Recipe to data base
// Recipe.insertMany(data)
//   .then((resp) => console.log(resp))
//   .catch((err) => console.log(err));

// -----------------------------------------------------

// 2. New Duraiton
// Recipe.updateOne(
//   { title: "Rigatoni alla Genovese" },
//   { $set: { duration: 100 } }
// ).then(() => {
//   console.log("NEW DURATION");
// });

// -----------------------------------------------------

// 3. Delete one element from the database
// Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
//   console.log("Element got deleted");
// });

// 4.Close the database
mongoose.connection
  .close()
  .then(() => {
    console.log("Database connection closed successfully");
  })
  .catch((error) => {
    console.error("Error closing database connection:", error);
  });
