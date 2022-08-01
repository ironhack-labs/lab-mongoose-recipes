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
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      // create a blueprint of the recipe model
      title: "First recipe of Hamburger",
      level: "Easy Peasy",
      ingredients: [
        "Meat",
        "Tomato",
        "Lettuce",
        "Pickels",
        "Onion",
        "Sauce",
        "Buns",
      ],
      cuisine: "Western Cuisine",
      dishType: "snack",
      image: "imgValue",
      duration: 10,
      creator: "Someone",
      created: new Date(),
    });
  })
  .then((createdRecipe) => {
    console.log("createdRecipe:", createdRecipe);
    return Recipe.insertMany(data); // data is the variable where we store the json file.
    //TODO: Whenever Recipe.insertMan(data) is finished it returns 1 value. That 1 value is getting passed into the .then promise.  Because it get passed into the .then it get passed into the newlyAddedRecipe callback function.
  })
  .then((newlyAddedRecipes) => {
    console.log("New added Recipes:", newlyAddedRecipes);
    console.log("About to get a list of all the recipes");
    return Recipe.find({});
  })
  .then((listOfAllRecipes) => {
    console.log("List of all Recipes:", listOfAllRecipes);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  }); // general error message when one of the promises fail

// Promises can either Resolved or reject.
// When they resolve, if defined, they call the `.then` method
// When they Reject, if defined they call the `.catch` method
// If the connection is failed it immediatly goes to the .catch method
// If the connection succeeded it will go to the next .then method
