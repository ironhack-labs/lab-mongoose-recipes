const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const Recipe = require("./models/Recipe");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.insertMany(data)
  .then(result => {
    return Promise.all([
      Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }),
      Recipe.deleteOne({ title: "Carrot Cake" })
    ]);
  })
  .then(result => {
    mongoose.connection.close();
  })
  .then(recipe => {
    console.log("connection was closed");
  })
  .catch(err => {
    console.log(err);
  });
