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
  }) // Iteration 2: create a NEW recipe
  .then(() => {
    return Recipe.create({
      title: "Kartoffelsuppe",
      level: "Amateur Chef",
      cuisine: "German",
      dishType: "soup",
      duration: 60,
    });
  }) // iteration 2: console log the recipe
  .then((createdRecipe) => {
    console.log("Recipe successfully created" + createdRecipe.title);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((createdRecipes) => {
    createdRecipes.forEach((recipe) =>
      console.log("Recipe sucessfully created for" + ` ${recipe.title}`)
    );
    // change the value which needs to be updated
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovesa" },
      { duration: 100 }
    );
  })
  .then((updatedRecipe) => {
    console.log("Recipe was successfully updated:" + updatedRecipe.title);

    return Recipe.deleteOne({
      title: "Carrot Cake",
    });
  })
  .then((deletedRecipe) => {
    console.log("Recipe was successfully deleted:" + deletedRecipe.title);
  })
  // iteration 6 You can close the connection with:
  .then(() => {
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
