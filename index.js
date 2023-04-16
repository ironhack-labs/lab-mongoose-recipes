const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model.js");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose.connect(MONGODB_URI);

then(() => {
  return Recipe.deleteMany();
});
then(() => {
  return Recipe.create({
    title: "Cheesecake",
    level: "Easy Peasy",
    ingredients: [
      "sugar",
      "flour",
      "eggs",
      "vanilla",
      "Philadelphia cheese",
      "liquid cream",
      "cookies",
      "butter",
    ],
    cuisine: "de la iaia",
    dishType: "dessert",
    duration: 60,
    creator: "Yabel Rodriguez",
  });
})
  .then((result) => {
    console.log(result.title);
  })

  //Iteration 3

  .then(() => {
    return Recipe.insertMany(data);
  })

  .then((result) => {
    result.forEach((recipe) => {
      console.log(recipe.title);
    });
  })

  //Iteration 4

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then((result) => {
    console.log(result.duration);
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .then((result) => {
    console.log("LETS GO");
  })

  .then(() => {
    mongoose.connection.close(() => {});
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
