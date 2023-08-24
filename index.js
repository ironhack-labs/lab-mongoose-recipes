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
    const newRecipe = {
      title: "Ham & Butter Sandwich",
      level: "Easy Peasy",
      ingredients: ["Baguette", "Butter", "Ham", "Pickles"],
      cuisine: "French",
      dishType: "main_course",
      image:
        "https://www.brasserielezinc.com/images/Image/sandwich-jambon-beurre-le-zinc-bassens-1.jpg",
      duration: 5,
      creator: "Unknown",
    };

    console.log(newRecipe.title);

    return Recipe.create(newRecipe);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
