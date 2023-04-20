const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://0.0.0.0:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "test",
      level: "Amateur Chef",
      ingredients: ["test"],
      cuisine: "test",
      dishType: "main_course",
      duration: 30,
      creator: "Chef Test",
    });
  })
  .then((recipe) => {
    console.log(`Recipe created: ${recipe.title}`);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(`Recipe created: ${recipe.title}`);
    });

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log(
      `Recipe: ${updatedRecipe.title} Duration: ${updatedRecipe.duration}`
    );

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deleteResult) => {
    console.log("Carrot Cake removed successfully:", deleteResult);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.connection.close().then(() => {
      console.log("Database connection closed.");
    });
  });
