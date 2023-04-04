const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .set("strictQuery", true)
  .connect(MONGODB_URI)
  .then((db) => {
    console.log(`Connected to the database: "${db.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    return Recipe.create(data[0]);
  })
  .then((recipe1) => {
    console.log(recipe1.title);
    Recipe.insertMany(data);
  })
  .then(() => {
    console.log(Recipe.find({}, { title: 1, _id: 0 }));
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then((recipe) => {
    console.log(`Well done, ${recipe.title} has been updated 🫡`);
    Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((recipe) => {
    console.log(`Congrats, ${recipe.title} has been deleted 👎`);
  })
  .then(() => {
    connection.end();
  })
  .catch((error) => {
    console.error(error);
  });
