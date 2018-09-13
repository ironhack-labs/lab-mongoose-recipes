const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./models/Recipe");

mongoose
  .connect("mongodb://localhost/recipeApp")

  .then(() => {
    return Recipe.collection.drop();
  })
  .then(() => {
    console.log("Connected to Mongo!");
    return Recipe.create({
      title: "Recipe1",
      level: "Easy Peasy",
      ingredients: ["pepperoni", "pizza"],
      cousine: "French",
      duration: 5,
      creator: "Rubén Armendáriz"
    });
  })
  .then(recipe => {
    console.log("Recipe created");
    console.log("The user is saved and its value is: ", recipe);
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
      
    );
  })
  .then(recipe => {
    //console.log(recipe.title);
    console.log("Updated");
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(recipe => {
    console.log("Deleted");
  })
  .then(() => {
    return Recipe.find({}, "title");
  })
  .then(title => {
    console.log(title);
    return mongoose.disconnect();
  })
  .then(() => {
    console.log("disconnect");
  })

  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
