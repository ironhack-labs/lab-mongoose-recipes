const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

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
    // InsertMany Recipes from data.json
    return Recipe.insertMany(data);
  })
  .then(() => console.log("Recipes were added!"))
  .then(() => {
    // Update Rigatoni Duration
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
  })
  .then(() => console.log("Rigatoni was updated!"))
  .then(() => {
    // Delete Carrot Cake
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => console.log("Carrot Cake was deleted!"))
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => mongoose.connection.close());
