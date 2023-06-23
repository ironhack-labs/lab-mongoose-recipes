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
    const myRecipe = {
      title: "Sandvic",
      level: "Easy Peasy",
      ingredients: ["Bread", "Lettuce", "Tomatoes", "Cheese", "Beef"],
      cuisine: "Turkish",
      dishType: "xXx",
      duration: 60,
      creator: "Aykut",
      created: new Date(),
    };
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(myRecipe);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((data) => {
    data.forEach((recipe) => {
      console.log("Recipe Title:", recipe.title);
    });
  })
  .then(() => {
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };

    return Recipe.findOneAndUpdate(filter, update);
  })
  .then(() => {
    const filter = { title: "Carrot Cake" };
    return Recipe.deleteOne(filter);
  })
  .then(() => {
    console.log("Hello world");
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
