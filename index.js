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
    const myRecipe = {
      title: "Stampot",
      level: "Easy Peasy",
      cuisine: "Dutch",
    };
    return Recipe.create(myRecipe);
  })
  .then((ruben) => {
    console.log(ruben);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((response) => {
    console.log(response);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then((response) => {
    console.log("It is a succes");
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((response) => {
    console.log("Succesful delete.");
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
