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
    // const newRecipe = Recipe.create({
    //   title: "Bubble Tea",
    //   level: "Amateur Chef",
    //   ingredients: [
    //     "sugar",
    //     "tapioca pearls",
    //     "milk",
    //   ],
    //   cuisine: "Asian",
    //   dishType: "drink",
    //   duration: 130,
    // })
    // .then((response) => console.log('Recipe Title', response.title))
    // .catch(() => {
    //   console.error("Error", error);
    // });

    Recipe.insertMany(data)
      .then((response) =>
        console.log(
          "Recipe Title",
          response.map((element) => element.title)
        )
      )
      .catch(() => {
        console.error("Error", error);
      });

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    )
      .then((response) => console.log("Recipe Updated", response))
      .catch(() => {
        console.error("Error", error);
      });

    Recipe.deleteOne({ title: "Carrot Cake" })
      .then((response) => console.log("Recipe Deleted", response))
      .catch(() => {
        console.error("Error", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
