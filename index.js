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

function createRecipe() {
  Recipe.create({
    title: "choco chips",
    level: "easy",
    ingredients: ["Chocolate", "Flour"],
    cuisine: "American",
    dishType: "Snack",
    image: "",
    duration: 20,
    creator: "fat american mom",
    created: "<1919-06-19>"
  }).then(res => {
    console.log("recipe created");
  });
}

Recipe.find({})
  .then(recipe => {
    console.log(recipe[0].title);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.insertMany(data)
  .then(recipe => {
    recipe.forEach(elem => {
      console.log(elem.title);
    });

    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(recipe => {
        console.log("yolo", recipe);
        console.log("Hello");
        // console.log("easy rigatoni");
      })
      .catch(err => {
        console.log(err);
      });

    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(recipe => {
        console.log("delete", recipe);
        // console.log("easy rigatoni");
        mongoose.disconnect(() => console.log("Closed"));
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });

console.log("Goodbye");
