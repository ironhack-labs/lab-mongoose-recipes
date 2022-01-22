const mongoose = require("mongoose");
require("./config/db.config");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

mongoose.connection.once("open", () => {
  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log("Database has been cleared"))
    // .then(() => {
    //   return Recipe.create(data)
    //})
    .then(() => {
      return Recipe.insertMany(data);
    })
    .then((dataSaved) => {
      dataSaved.forEach((recipe) => console.log(recipe.title));
    })
    .then(() => {
      return Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      );
    })
    .then((recipe) => {
      console.log(`The ${recipe.title} has been updated`);
    })
    .then((deleteReceipe) => {
      return Recipe.findOneAndDelete({ title: "Carrot Cake" });
    })
    .then((deleteRecipe) => {
      console.log(`Oh oh! ${deleteRecipe.title} is no longer available`);
    })
    .catch((err) => console.log(err))
    .finally(() => mongoose.connection.close());
});
