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
    return Recipe.create({
      title: "Mac&Cheese",
      level: "Easy Peasy",
      ingredients: ["Macaronis", "Cheddar cheese", "Butter"],
      cuisine: "American",
      dishType: "main_course",
      duration: 10,
      creator: "Raquel",
    });
  })
  .then((newRecipe) => {
    console.log("New recipe title", newRecipe.title);
    return Recipe.insertMany(data);
  })
  .then((newRecipes) => {
    newRecipes.forEach((recipe) => {
      console.log("All recipes title", recipe.title);
    });
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true });
  })
  .then(() => {
    console.log("Recipe duration updated correctly!");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe deleted correctly");
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Database closed succesfully!")
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });


  //Promise chaining: si falla un .then(), el resto no se ejecutarán y directamente pasa al primer .catch que encuentre
