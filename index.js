const mongoose = require("mongoose");
const express = require("express");
//const hbs = require("hbs");
const morgan = require("morgan");

const index = express();
index.use(morgan("dev"));

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: "Carbonara´s Pizza",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://recetinas.com/wp-content/uploads/2020/02/pizza-carbonara.jpg",
      duration: 30,
      creator: "Tito Berni",
    };
    //console.log(data.find(title));
    return Recipe.create(newRecipe);
  })

  .then(() => {
    console.log("All recipes included");
    return Recipe.insertMany(data);
  })

  .then(() => {
    console.log("Recipe modified!");
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

//index.listen(3000, () => console.log("Index listening on port 3000!"));
