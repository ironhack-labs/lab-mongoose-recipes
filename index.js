const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// const Recipe = mongoose.model("Recipe", recipeSchema);

// Recipe.create({
//   title: "Hanna's Pancakes",
//   level: "UltraPro Chef",
//   ingredients: [
//     "1 cup flour",
//     "1 cup oatmilk",
//     "1/2 tsp salt",
//     "1 tsp sugar",
//     "1/2 tsp cinammon",
//     "1/2 tsp butter",
//     "maple syrup (you decide how much ;) )"
//   ],
//   cuisine: "American",
//   dishType: "Breakfast",
//   image:
//     "https://media.eggs.ca/assets/RecipePhotos/_resampled/FillWyIxMjgwIiwiNzIwIl0/Fluffy-Pancakes-New-CMS.jpg",
//   duration: 20,
//   creator: "Steve Jobs"
// })
//   .then(recipe => {
//     console.log(recipe.title); // our recipe(placeholder)
//   })
//   .catch(err => {
//     console.log("ERROR: ", err);
//   });

// Recipe.insertMany(data)
//   .then(recipesArray => {
//     //
//     recipesArray.forEach(object => {
//       console.log(object.title);
//     });
//   })
//   .catch(err => {
//     console.log("ERROR: ", err);
//   });

// Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Recipe.deleteOne({ title: "Carrot Cake" })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.log(err);
//   });

mongoose.connection.close();
