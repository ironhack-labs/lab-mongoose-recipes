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

    // Run your code here, after you have insured that the connection was made
  })
  .then(() => {
    Recipe.create({
      title: "Noodles",
      ingredients: ["Water", "Flour,"],
      cuisine: "Korean",
    })
      .then((newRecipe) => console.log(newRecipe.title))
      .catch((err) => console.log(err))
      .catch((error) => {
        console.error("Error connecting to the database", error);
      });

    Recipe.insertMany(data)
      .then((createdRecipe) => console.log(createdRecipe))
      .catch((err) => console.log(err))

      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
          .then((updatedRecipe) =>
            console.log(updatedRecipe.title, updatedRecipe.duration)
          )
          .catch((err) => console.log(err));
      })
      .then(() => {
        Recipe.deleteOne({ title: "Carrot Cake" })
          .catch((err) => console.log(err))
          .finally(() => {
            mongoose.connection.close();
          });
      });
  });
