const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese",
      },
      {
        $set: { duration: 100 },
      },
      { overwrite: true, new: true }
    );
  })
  .then((recipe) => {
    console.log(`${recipe.title} has been successfuly updated`);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((obj) => {
    console.log(`${obj.deletedCount} recipe(s) has been successfuly deleted`);
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
