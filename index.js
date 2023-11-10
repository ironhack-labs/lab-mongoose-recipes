const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("All existing recipes deleted from the DB!!!");
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: "Patates Braves",
      level: "Easy Peasy",
      ingredients: ["Patates", "Salsa"],
      cuisine: "Spanish",
      dishType: "starter",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgastronomicament.cat%2Fde%2Frecepta%2Frecepta-patates-braves&psig=AOvVaw3tQm-CQKyTF8ErQUhw4uMk&ust=1699716749888000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNjiu7rguYIDFQAAAAAdAAAAABAI",
      duration: 15,
      creator: "Celia Angles",
    };
    return Recipe.create(newRecipe);
    // Run your code here, after you have insured that the connection was made
  })

  .then((result) => console.log(`Recipe created: ${result}`))
  .then(() => Recipe.insertMany(data))
  .then((result) => {
    // console.log(`Created recipes:`, result);
    console.log(`Created ${result.length} recipes`);
    return Recipe.findOneAndUpdate(
      { title: "Canelons" },
      { duration: 120 },
      { new: true }
    );
  })
  .then((result) => {
    console.log(
      `Updated ${result.title} and new duration is: ${result.duration}`
    );

    return Recipe.deleteOne({ title: "canelons" });
  })
  .then((result) => {
    console.log("The recipe was deleted", result);
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
