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

// Recipe.create({
//   title: "arepas",
//   level: "Easy Peasy",
//   ingredients: ["dough", "water", "salt", "relleno"],
//   cuisine: "venezuelan dish",
//   dishType: "Breakfast",
//   image:
//     "https://us.hola.com/imagenes/cocina/recetas/2017082998650/receta-lectores-arepas-venezonalas/0-482-170/arepas-lectores-a.jpg",
//   duration: 15,
//   creator: "me"
// })
//   .then(recipe => {
//     console.log(recipe.title);
//   })
//   .catch(err => {
//     console.log("Something went wrong");
//   });

// Recipe.insertMany(data)
//   .then(data => {
//     data.forEach(eachRecipe => {
//       console.log(eachRecipe.title);
//     });
//   })
//   .catch(err => {
//     console.log("Something went wrong: " + err);
//   });
// Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
//   .then(() => {
//     console.log("Success! the recipe has been updated");
//   })
//   .catch(err => {
//     console.log("Something went wrong: " + err);
//   });
Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => {
    console.log("Success! the recipe has been deleted");
  })
  .catch(err => {
    console.log("Something went wrong: " + err);
  });
