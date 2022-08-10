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
    const newRecipe = {
      title: "Hamburguer Recipe",
      level: "Easy Peasy",
      ingredients: ["meat", "tomato", "lettuce", "pickles", "sauce"],
      cuisine: "Western",
      dishType: "main_course",
      image: "hamburguer",
      duration: 15,
      creator: "Chef Ramsay",
      created: new Date(),
    };
    Recipe.create(newRecipe)
      .then(() => {
        console.log("A new recipe has entered the DB:", newRecipe.title);
      })
      .catch((error) => {
        console.log("An error happened while saving a new user:", error);
      });
    Recipe.insertMany(data)
      .then(() => {
        data.forEach((element) => {
          console.log(`Many recipes have entered the DB: ${element.title}`);
        });
      })
      .catch((error) => {
        console.log("An error happened while saving a new user:", error);
      });
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then(() => {
        console.log("Recipe's duration has been modified");
      })
      .catch((error) => {
        console.log("An error happened while modifying a recipe:", error);
      });
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => {
        console.log("Recipe's has been deleted");
      })
      .catch((error) => {
        console.log("An error happened while deleting a recipe:", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// mongoose.connection.close();
