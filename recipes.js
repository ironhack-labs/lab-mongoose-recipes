const mongoose = require("mongoose");
const data = require("./data.js");
const Recipe = require("./models/Recipe");

// connection to database
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// create a simple recipe
Recipe.create({
  title: "Lasagna de pavo",
  level: "Amateur Chef",
  ingredients: [
    "Molida de pavo",
    "Queso camembert",
    "Pasta lasagna",
    "Jitomates",
    "Ajo",
    "Queso Parmesano",
    "Aceite de oliva",
    "Cilantro"
  ],
  cuisine: "Italiana",
  dishType: "Dish",
  image:
    "https://static01.nyt.com/images/2015/10/15/dining/15RECIPE20DIN/15RECIPE20DIN-superJumbo.jpg",
  duration: 160,
  creator: "Chef Buddy"
})
  .then(receta => {
    console.log(`Titulo de Receta ingresada: ${receta.title}`);
  })
  .catch(err => {
    console.log(`Error al ingresar receta: ${err}`);
  });
