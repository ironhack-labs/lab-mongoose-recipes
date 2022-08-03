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
    //Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Chocolate Treatment",
      level: "Happy Days",
      ingredients: ["Chocolate", "Chocolate", "Chocolate"],
      cuisine: "International",
      dishType: "All Day",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 2,
      creator: "Maxime",
      created: new Date(),
    });
  })
  .then((createdRecipe) => {
    console.log("createdRecipe", createdRecipe.title);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((allRecipes) => {
    for (let i = 0; i < data.length; i++) {
      console.log(allRecipes[i].title);
    }
  })
  .then(() => {
    let duration = 100;
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration }
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
