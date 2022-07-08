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

    // Before adding any recipes to the database, let's remove all existing ones!!!
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Create new Recipe

    // const newProduct = {
    //   title: "World's best Thai Curry",
    //   level: "UltraPro Chef",
    //   ingredients: "MSG, Thai Curry Paste, Peanut Butter, Coconut Milk",
    //   cuisine: "Asian",
    //   dishType: "main_course",
    //   duration: 60,
    //   creator: "Jack Le Chef",
    // };

    // console.log("Recipe was created!");

    // return Recipe.create(newProduct);

    console.log("Multiple recipes were created!");

    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    // console.log(recipes);
    console.log("The faulty recipe was successfully changed!");

    return Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese",
      },
      { duration: 100 },
      { returnDocument: "after" }
    );
  })
  .then((recipeToRemove) => {
    console.log("A recipe was removed successfully!");

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((result) => {
    console.log("The database was closed.");
    return mongoose.end(MONGODB_URI);

    // How do you close a DB?
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
