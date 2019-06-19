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

function firstRecipe() {
  Recipe.deleteMany()
    .then(() =>
      Recipe.create({
        title: "Pesto",
        level: "Easy Peasy",
        ingredients: ["basilic", "ail", "olive oil", "parmesan"],
        cuisine: "Italian",
        dishtype: "Other",
        image: null,
        duration: 15,
        creator: "Virbee"
      })
    )
    .then(recipe => {
      console.log("My recipe is called", recipe.title);
      return Recipe.insertMany(data); //renvoie une promesse dans laquelle il y a un array des recettes insérées
    })
    .then(manyRecipes => {
      manyRecipes.forEach(recipe => {
        console.log("There is a recipe called", recipe.title); //print on the console the title of each recipe
      });
      return Recipe.updateOne(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      ); //renvoie une promesse qui contient un objet avec nb trouvé, nb modifé et nb ok (?)
    })
    .then(() => {
      console.log("Recipe updated");
      return Recipe.deleteOne({ title: "Carrot Cake" }); //renvoie une promesse qui contient un objet avec un nb trouvé, nb modifié et le nbr supprimé
    })
    .then(() => {
      console.log("Recipe deleted");
      return Recipe.find();
    })
    .then(recipes => {
      recipes.forEach(recipe => {
        console.log(recipe.title);
      });
      return mongoose.disconnect();
    })
    .then(() => {
      console.log("Disconnected from mongo");
    })
    .catch(err => {
      console.log("Error: ", err);
    });
}

firstRecipe();
