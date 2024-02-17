const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

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
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({ title: "No pollo con piña", cuisine: "vegan" })
      .then((record) => {
        console.log(record.title);
      })
      .catch((error) => {
        console.error("Error when inserting a single record", error);
      });
  })
  .then(() => {
    // Create multiple recipes
    return Recipe.create(data)
      .then((recipes) => {
        recipes.forEach((recipe) => {
          console.log(recipe.title);
        });
      })
      .catch((error) => {
        console.error("Error when inserting a several record", error);
      });
  })
  .then(() => {
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then(() => console.log("Success updating!!"))
      .catch((error) => console.error("Error when updating a recipe", error));
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => {
        console.log("Success deleting!!");
        mongoose.connection.close(() => {
          console.log("Mongoose connection is closed");
        });
      })
      .catch((error) => console.error("Error when deleting a recipe", error));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
