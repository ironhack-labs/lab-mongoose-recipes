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
    console.error("Error connecting to mongo");
  });

// Recipe.create(
//   {
//     title: "Soup",
//     level: "Easy Peasy",
//     ingredients: ["carrots", "onions", "leeks", "beans", "water"],
//     cuisine: "international",
//     dishType: "Dish",
//     duration: 60,
//     creator: "Susan"
//   }
//   // ma recette est dans data.js en position 0 de l'array
//   // create est une méthode de mongoose
// )
//   .then(recipe => {
//     console.log("The recipe is saved and its value is:", recipe.title);
//   })
//   .catch(err => {
//     console.log("An error happened:");
//   }); // pour vérifier si la recipe a bien été créée, on aurait pu faire une promise qui aurait dit dans le then : "recipe has been added" et dans le catch "error..."

// Recipe.insertMany(data)
//   .then(recipe => {
//     recipe.forEach(test => {
//       console.log("The recipe is saved and its value is:", test.title);
//     });
//   })
//   .catch(err => {
//     console.log("An error happened:");
//   });

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(console.log("all good"))
  .catch(err => {
    console.log("fail");
  });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(console.log("carrot cake deleted"))
  .catch(err => {
    console.log("not deleted");
  });

mongoose.connection.close();
