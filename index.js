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
    console.log(
      `Iteration 1: Connected to the database: "${self.connection.name}"`
    );
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe = Recipe.create({
      title: "Crêpe Gigi",
      level: "Amateur Chef",
      ingredients: [
        "250g of buckwheat flour",
        "2 eggs",
        "25cl of milk",
        "25cl of water",
        "40g of butter",
        "Oil",
        "Salt",
        "warm rose petals",
        "no sugar",
      ],
      cuisine: "Savoyard",
      dishType: "main_course",
      image: "https://i.skyrock.net/2675/14622675/pics/481259121.jpg",
      duration: 10,
      creator: "Gigi",
    });
    return recipe;
  })
  .then((recipe) => {
    console.log(recipe.title);
  })
  .then(() => {
    const recipesArray = Recipe.insertMany(data);
    return recipesArray;
  })
  .then((recipesArray) => {
    recipesArray.forEach((oneRecipe) => {
      console.log(oneRecipe.title);
    });
  })
  .then(() => {
    const updatedRecipe = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    return updatedRecipe;
  })
  .then((updatedRecipe) => {
    console.log(updatedRecipe.duration);
  })
  .then(() => {
    const removedRecipe = Recipe.deleteOne({ title: "Carrot Cake" });
    return removedRecipe;
  })
  .then((removedRecipe) => {
    console.log(removedRecipe);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .then(() => {
    console.log("Closing the database");
    mongoose.connection.close();
  });
