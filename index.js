const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return createRecipe();
  })
  .then((recipeFromDb) => {
    console.log("what is this:", recipeFromDb.title);
    return includeDataJson();
  })
  .then((data) => {
    data.forEach((recipe) => console.log("all recipes", recipe.title));
    return updateRecipe();
  })
  .then(() => {
    return removeRecipe();
  })
  .then(() => {
    console.log("success removed");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

function createRecipe() {
  const recipeData = {
    title: "Chicken Wings",
    cuisine: "Asian",
  };
  return Recipe.create(recipeData);
}

function includeDataJson() {
  return Recipe.insertMany(data);
}

function updateRecipe() {
  return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 });
}

function removeRecipe() {
  return Recipe.deleteOne({ title: "Carrot Cake" });
}
