const { CallTracker } = require("assert");
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
    const recipe1 = {
      title: "Pizza",
      level: "Amateur Chef",
      ingredients: ["flour, eggs, water, cheese, tomato sauce"],
      cuisine: "Italian",
      dishType: "main_course",
      duration: "40",
      creator: "Alexandre",
    };
    Recipe.create(recipe1)
      .then((newRecipe) => console.log(`created new recipe: ${newRecipe}`))
      .catch(() => {
        console.log("error while creating the first recipe");
      });
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((newRecipes) => {
        newRecipes.forEach((recipe) => {
          console.log(`created new recipe: ${recipe.title}`);
        });
      })
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
          .then(() => console.log("sucessful update"))
          .catch((err) => console.log(err));
      })
      .then(() => {
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((newRecipes) => {
            console.log("super sucess");
            mongoose.disconnect(() => console.log("Disconnected"));
          })
          .catch((err) => console.log(err));
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
