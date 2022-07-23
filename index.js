const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "The best vegan cheese cake",
      level: "Easy Peasy",
      ingredients: [
        "300 g flour",
        "150 g sugar",
        "180 g margarine",
        "8 g vanilla sugar",
        "9 g baking powder",
        "1/4 t salt",
        "2 cups Alpro Skyr Vanilla",
        "74 g vanilla pudding",
        "200 g sugar",
        "100 g margarine",
        "30 g lemon juice",
        "lemon zest",
      ],
      cuisine: "yummie",
      dishType: "dessert",
      image:
        "https://veggie-einhorn.de/wp-content/uploads/Veganer-Kaesekuchen-serviert-mit-Himbeeren.jpg",
      duration: 85,
      creator: "Karen Wilkening",
      dreated: 2019 - 10 - 14,
    }).then((newRecipe) => {
      console.log("Title of recipe: ", newRecipe.title);
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((manyRecipes) => {
    manyRecipes.forEach((recipe) => {
      console.log("Title of recipe: ", recipe.title);
    });
  })
  .then(() => {
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };
    return Recipe.findOneAndUpdate(filter, update);
  })
  .then(() => {
    console.log("Successfully updated the duration of Rigatoni alla Genovese!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
