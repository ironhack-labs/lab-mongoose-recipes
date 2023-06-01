const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

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
    //Iteration 2
    const recipeOne = {
      title: "Curry Chicken",
      level: "UltraPro Chef",
      ingredients: [
        "curry sauce",
        "chicken",
        "rice",
        "basil",
        "pepper",
        "salt",
        "onion",
        "carrots",
      ],
      cuisine: "India",
      dishType: "main_course",
      image: "/public/images/currychicken.jpeg",
      duration: 60,
      creator: "Jamie Oliver",
      created: "2023-06-01",
    };
    return Recipe.create(recipeOne);
  })
  .then((recipeOne) => {
    console.log(recipeOne.title);
    //Iteration 3
    return Recipe.insertMany(data);
  })
  .then((recipeArr) => {
    recipeArr.forEach((recipe) => {
      console.log(recipe.title);
    });
    //
    //
    //at first, we tried the below because the forEach didnt work
    /*
    return Recipe.find(
      {},
      {
        title: 1,
      }
    );
  })
  .then((result) => {
    console.log(result);
    */
    
    //
    //
    // Iteration 4
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      {
        duration: 100,
      }
    );
  })
  .then(() => {
    console.log("Rigatoni is done faaaast");
    //Iteration 5
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Carrot cake all gone");
    //Iteration 6
    mongoose.connection.close();
  })
  .then(() => {
    console.log("We are closed, come by tomorrow");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
