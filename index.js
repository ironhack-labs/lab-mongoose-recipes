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
      title: "Carbonara's Pizza",
      level: "Amateur Chef",
      ingredients: [
        "Homemade or refrigerated pizza dough",
        "100 ml liquid cream for cooking",
        "200gr bacon",
        "1 ball mozzarella cheese",
        "Salt",
        "100gr sliced mushrooms",
        "ground black pepper",
        "100gr grated cheese",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://recetinas.com/wp-content/uploads/2020/02/pizza-carbonara.jpg",
      duration: 30,
      creator: "Chef Tito Berni",
    };
    console.log("New recipe created successfully");
    return Recipe.create(newRecipe);
  })

  .then(() => {
    console.log("All recipes included successfully");
    return Recipe.insertMany(data);
  })

  .then(() => {
    console.log("Recipe modified successfully");
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  })

  .then(() => {
    console.log("Recipe deleted successfully");
    return Recipe.deleteOne({title: "Carrot Cake"})
  })

  .then(() => {
    mongoose.connection.close();
    console.log("Conection closed successfully")
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

//index.listen(3000, () => console.log("Index listening on port 3000!"));
