const mongoose = require("mongoose");

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
    // Run your code here, after you have insured that the connection was made

    Recipe.insertMany(data)
      .then((recipe) => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true, runValidators: true }
        )
          .then((newRecipe) => {
            Recipe.deleteOne({ title: "Carrot Cake" })
              .then(() =>
                console
                  .log("The recipe has been delete successfully")   
              )
              .finally(() => {
                // Close the Mongoose connection
                mongoose.connection.close();
              })
              .catch((error) =>
                console.log("An error happened while delete the recipe:", error)
              );
            console.log("The recipe has been update: ", newRecipe);
          })
          .catch((error) =>
            console.log("An error happened while update a new recipe:", error)
          );
        console.log("The recipes is saved");
      })
      .catch((error) =>
        console.log("An error happened while saving a new user:", error)
      );
  })
  
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
