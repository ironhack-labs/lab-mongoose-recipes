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

    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create({ title: "first recipe", cuisine: "first cuisine" })
      .then((createdRecipe) => console.log(createdRecipe.title))
      .catch((err) => console.log(err));

    Recipe.insertMany(data)
      .then((createdRecipe) => console.log(createdRecipe.title))
      .catch((err) => console.log(err));

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    )
      .then((createdRecipe) => console.log(createdRecipe.title))
      .catch((err) => console.log(err));

    Recipe.findOneAndDelete({ title: "Carrot Cake" })
      .then((deletedBook) => console.log(deletedBook))
      .catch((err) => console.log(err));

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
