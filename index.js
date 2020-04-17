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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "title of the recipe",
      cuisine: "cook something",
    });
  })
  .then((recipe) => {
    console.log("name", recipe.title);
  })
  .then(() => {
    return Recipe.create(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) => console.log("recipe created:", recipe.title));
  });
Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese", duration: 220 },
  { title: "Rigatoni alla Genovese", duration: 100 }
)
  .then((result) => {
    console.log("updated successfully");
  })
  .catch((err) => {
    console.log(err);
  });
Recipe.deleteOne({ title: "Carrot Cake" })
  .then((result) => {
    console.log("removed successfully");
  })
  .catch((err) => {
    console.log(err);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
