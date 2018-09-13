const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./models/Recipe.js");

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
    return Recipe.find({}, { title: 1, _id: 0 });
  })
  .then(results => {
    console.log(results);
  })
  .then(() => {
    return Recipe.update(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("The Recipe was updated");
  })
  .then(updated => console.log(updated))
  .then(() => {
    return Recipe.remove({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("The Recipe was removed");
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });
