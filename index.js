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
    .then(recipe => {
      console.log("My recipe is called");
      manyRecipes();
    })
    .catch(err => {
      console.log("Error: ", err);
    });
}

//Insert many recipes
function manyRecipes() {
  Recipe.insertMany(data)
    .then(
      data.forEach(recipe => {
        console.log("There is a recipe called", recipe.title); //print on the console the title of each recipe
      })
    )
    .then(updateRecipe())
    .catch(err => {
      console.log("Error : ", err);
    });
}

// update Rigatoni alla Genovese's duration
function updateRecipe() {
  Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(res => {
      console.log("Recipe updated");
      deleteRecipe();
    })
    .catch(err => {
      console.error(err);
    });
}

//remove the Carrot Cake
function deleteRecipe() {
  Recipe.deleteOne({ title: "Carrot Cake" })
    .then(res => {
      console.log("Recipe deleted");
      disconnection();
    })
    .catch(err => {
      console.error(err);
    });
}

function disconnection() {
  console.log("Mongoose Disconnected");
  mongoose.disconnect();
}

//After doing all the task you should close the database.
firstRecipe();
