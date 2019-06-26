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

//Put averything inside delete many

Recipe.deleteMany({}).then(() => {
  Recipe.create({
    title: "Papa Rosti",
    level: "Easy Peasy",
    ingredients: ["potato", "salt", "pepper", "olive oil"],
    cuisine: "Swiss",
    duration: 15,
    creator: "Sonia"
  }).then(createdRecipe => {
    console.log("The title of the recipe is " + createdRecipe.title);
  });

  Recipe.insertMany(data).then(recipes => {
    console.log("recipes", recipes.map(recipe => recipe.title));

    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(res => {
        console.log("Rigatoni updated", res)
        //I think res is what logs the modifications 
      })
      .catch(err => console.log("Err there was an error"));
  
    Recipe.deleteOne({ title: "carrot Cake" })
      .then(console.log("succesfully erased"))
      .catch("Err there was an error");
  });

});
