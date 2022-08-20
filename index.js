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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = await Recipe.create({
      title: "weirdRecipe",
      level: "UltraPro Chef",
      ingredients: ["potato", "onion", "cheese", "oil"],
      cuisine: "Serbian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 30,
      creator: "Marko Ivezic",
    });

    const manyRecipes = await Recipe.insertMany(data);
    const updatedRecipe = await Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese",
      },
      {
        duration: 100,
      }
    );

    const removeRecipe = await Recipe.deleteOne({
      title: "Carrot Cake",
    });
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
