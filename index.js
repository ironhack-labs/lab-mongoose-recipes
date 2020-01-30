const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error("Error connecting to mongo", err));

// Recipe.create({
//   title: "Sandwich",
//   level: "Easy Peasy",
//   ingredients: ["bread", "butter", "lettuce", "ham"],
//   cuisine: "international",
//   dishType: "Snack",
//   duration: 2,
//   creator: "Karo"
// })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Recipe.insertMany(data).then(result =>
//   result.forEach(recipe => console.log(recipe.title))
// );

// Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
//   .then(result => {
//     console.log("The change was made!", result);
//   })
//   .catch(err => console.log("Error", err));

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(result => {
    console.log("The recipe was deleted!", result);
  })
  .catch(err => console.log("Error", err));
