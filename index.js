const mongoose = require("mongoose");
const connectDB = require("./config/db");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

// Connection to the database "recipe-app"
connectDB()
  .then(() => {
    console.log(`Connected to the database`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Iron-Pfanne",
      level: "Easy Peasy",
      ingredients: ["Iron", "Mushrooms", "Oatmilk"],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      duration: 20,
      creator: "Iron-Fran",
    })
      .then(Recipe.insertMany(data))
      .then()
      .then((e) => console.log("Worked."));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
