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
  .then((newRecipe) => {
    // Run your code here, after you have insured that the connection was made
    const firstRecipe = {
      title: "Pasta carbonara",
      levels: "Easy Peasy",
      ingredients: ["spaghetti", "parmesan", "eggs", "guanciale"],
      cuisine: "italian",
      dishtype: "main_course",
      duration: 30,
      creator: "Chef Pedro",
    };
    console.log(firstRecipe.title);

    return Recipe.create(firstRecipe);
  })
  .then((manyRecipes) => {
    return Recipe.insertMany(data);
  })
  .then((titleRecipe) => {
    return Recipe.collection.distinct("title");
  })
  .then((updateRecipe) => {
    console.log(updateRecipe);
    return Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese",
      },
      { duration: 100 }
    );
  })
  .then((removeRecipe) => {
    console.log("Update success");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((closeMongoDB) => {
    console.log("Remove success");
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
