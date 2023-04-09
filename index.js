const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model.js");
// Import of the data from './data.json'
const data = require("./data");

then(() => {
  // Run your code here, after you have insured that the connection was made
  //Iteration 2
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

  .then(() => {
    //Iteration 3
    return Recipe.insertMany(data);
  })

  .then((result) => {
    result.forEach((recipe) => {
      console.log(recipe.title);
    });
  })

  .then(() => {
    //Iteration 4
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then((result) => {
    console.log("LETS GO!", result.duration);
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .then((result) => {
    console.log("LETS GO");
  })

  .then(() => {
    mongoose.connection.close(() => {
      console.log("close!");
      process.exit(0);
    });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
