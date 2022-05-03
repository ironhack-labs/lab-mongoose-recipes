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
    Recipe.create(data).then((createdRecipes) => {
      console.log(`Created ${createdRecipes.length} recipes!`);
    });
  })
  .then(() => {
    Recipe.insertMany(data, (error, docs));
  })
  .then(() => {
    Recipe.findOneAndUpdate(
      query,
      { $set: { duration: 100 } },
      options,
      callback
    );
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Oh no!!!, we run out of Carrot Cakes");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

connection.end();
