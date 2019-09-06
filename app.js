const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
    return Recipe.deleteMany({});
  })
  .then(() => {
    const aRecipe = {
      title: "Easy Pancakes",
      level: "Easy Peasy",
      ingredients: ["milk", "flower", "eggs", "oil"],
      cuisine: "international",
      image:
        "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1273477_8.jpg?itok=6VhpTntM",
      duration: 30,
      creator: "Chef Unknown"
    };
    return Recipe.create(aRecipe);
  })
  .then(recipe => {
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })
  .then(allRecipes => {
    for (let i = 0; i < allRecipes.length; i++) {
      console.log(allRecipes[i].title);
    }
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: "100" }
    );
  })
  .then(succes => {
    console.log("Recipe successfully updated");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(succes => {
    console.log("Recipe successfully deleted");
    return mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
