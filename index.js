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
    createRecipe();
    includeDataJson();
    updateRecipe();
    //removeRecipe(); 
    //mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
  removeRecipe(); 

function createRecipe() {
  const recipeData = {
    title: "Chicken Wings",
    cuisine: "Asian",
  };

  Recipe.create(recipeData)
    .then((recipeFromDb) => console.log(recipeFromDb.title))
    .catch((err) => console.log(err));
}

function includeDataJson() {
  Recipe.insertMany(data)
    .then((recipeFromDb) => {
      recipeFromDb.forEach((recipe) => {
        console.log(recipe.title);
      });
    })
    .catch((err) => console.log(err));
}

function updateRecipe() {
  Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(() => {
      console.log("success updated");
    })
    .catch((err) => console.log(err));
}

function removeRecipe() {
  Recipe.deleteOne({ title: "Carrot Cake" })
    .then(() => {
      console.log("success removed");
    })
    .catch((err) => console.log(err));
}
