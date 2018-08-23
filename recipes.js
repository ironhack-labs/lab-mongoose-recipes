const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const Recipe = require("./models/schemaR.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.insertMany(data)
  .then(() => {
    return Promise.all([
      Recipe.create({ name: "Sushi", cousine: "Japanese" }),
      Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }),
      Recipe.remove({ title: "Carrot Cake" })
    ]);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .then(() => {
    console.log("connection was closed");
  })
  .catch(err => {
    console.error(err);
  });
