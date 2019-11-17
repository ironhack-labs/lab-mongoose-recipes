const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'
const index = express();
// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// our first Route:
index.get("/", (request, response, next) => {
  response.send("<h1>Holi</h1>");
});

const recipe = new Recipe({
  title: "Birria",
  level: "Easy Peasy",
  ingredients: ["Musho shivo"],
  cuisine: "Mexican",
  dishType: "Dish",
  image:
    "https://cocina-casera.com/mx/wp-content/uploads/2019/03/birria-cerdo.jpg",
  duration: 180,
  creator: "Someone",
  created: "2019-11-17"
});
recipe
  .save()
  .then(newRecipe => console.log(`New recipe: ${recipe}`))
  .catch(err => console.log(`Error:${err}`));

const recetas = Recipe.insertMany(data)
  .then(newRecipes => console.log(`${recipes}`))
  .catch(err => console.log(err));

const updaterecipe = Recipe.updateOne(
  {
    title: "Rigatoni alla Genovese"
  },
  {
    duration: 100
  }
)
  .then(() => console.log("successful update"))
  .catch(err => console.log(`something happened: ${err}`));

const deleterecipe = Recipe.deleteOne({
  name: "Carrot Cake"
})
  .then(() => console.log("successful update"))
  .catch(err => console.log(`something happened: ${err}`));

index.listen(3000, () => console.log("http://localhost:3000"));
