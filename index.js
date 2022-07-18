const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { insertMany } = require("./models/Recipe.model");

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
    const steps = {
      title: "Feijoada",
      level: "UltraPro Chef",
      ingredients: ["Feijão", "Cebola", "Alho", "Carnes"],
      cuisine: "brazilian",
      dishType: "main_course",
    };

    const recipe = new Recipe(steps);

    return recipe.save().then((recipe) => console.log(recipe.title));
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((arrRecipes) => {
    arrRecipes.forEach((recipe) => console.log(recipe.title));
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe deleted.");
    mongoose.connection.close(function () {
      console.log("Mongoose disconnected on app termination");
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
