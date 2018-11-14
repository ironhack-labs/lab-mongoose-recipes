const Recipe = require("./models/recipes");
const mongoose = require("mongoose");
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
    return Recipe.collection.drop();
  })
  .then(() => {
    return Recipe.create({
      title: "Tortilla",
      level: "Easy Peasy",
      ingredients: ["huevos", "patata", "cebolla", "sal", "aceite de oliva"],
      cuisine: "mediterranea",
      dish: "Snack",
      duration: 20,
      creator: "edu"
    })
      .then(recipe => {
        console.log(recipe.title);
      })
      .catch(err => {
        console.log("An error happened:", err);
      });
  })
  .then(() => {
    return Recipe.insertMany(data)
      .then(recipe => {
        recipe.forEach((i)=>{console.log(i.title)})
      })
      .catch(err => {
        console.log("An error happened:", err);
      });
  })
  .then(() => {
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then(recipe => {
        console.log('updated OK!!!');
      })
      .catch(err => {
        console.log("An error happened:", err);
      });
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(recipe => {
        console.log('delated OK!!!');
        mongoose.disconnect();

      })
      .catch(err => {
        console.log("An error happened:", err);
      });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
