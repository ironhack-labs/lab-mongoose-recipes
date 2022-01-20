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
    data.forEach((recipe) => {
      Recipe.create(recipe);
      console.log(recipe.title);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .then(() => {
    Recipe.findByIdAndUpdate("61e9cb5a21b96eba3f49252b", { duration: 100 })
      .then(() => {
        console.log(
          "You did it! Now you just have another 99.999.999 problems to solve ;D"
        );
      })
      .catch((err) => {
        console.log(err, "on updating");
      });
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then((removed) => {
        console.log(`${removed} is out! Choose another`);
      })
      .catch((notRemoved) => {
        console.log(
          `${notRemoved} was not removed, so it is still available :)`
        );
      });
  })
  .finally(() => {
    mongoose.connection.on("disconnected", () => {
      console.log("See ya later aligator :)");
    });
  });
