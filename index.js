const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
    return Recipe.collection.drop();
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  })
  .then(() => {
    return Recipe.create({
      title: "Sito Ahora si",
      level: "Amateur Chef",
      ingredients: ["Tomate", "Queso", "Jamon York"],
      cuisine: "Italian",
      dishType: "Breakfast",
      duration: 20,
      creator: "Carlito"
    })
      .then(newRecipeCreated => {
        console.log(newRecipeCreated);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .then(() => {
    return Recipe.insertMany(data).then(newRecipes => {
      newRecipes.forEach(newRecipe => {
        console.log(newRecipe.title);
      });
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then(updatedRecipe => {
      console.log("Updated recipe: " + updatedRecipe.title);
    });
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" }).then(deleteReciped => {
      console.log("Deleted recipe!");
    });
  })
  .then(() => {
    return mongoose.disconnect();
  });
