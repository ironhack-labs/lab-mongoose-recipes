const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

const pathToData = require("./data.json");

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: "Paella",
      level: "Amateur Chef",
      ingredients: ["Rice", "Tomato", "Pork Ribs", "Olive Oil"],
      cuisine: "Valencian",
      dishType: "main_course",
      duration: 35,
      creator: "Cristian",
      created: "2023-03-16",
    };

    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log(createdRecipe.title);

    return Recipe.insertMany(pathToData);
  })
  .then((recipesArrFromDB) => {
    for (let i = 0; i < recipesArrFromDB.length; i++) {
      console.log(recipesArrFromDB[i].title);
    }

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Connection to DB properly STOPPED!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
