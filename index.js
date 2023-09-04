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
    const newRecipe = {
      title: "pepper coffee",
      level: "Easy Peasy",
      ingredients: [
        "coffeepowder:1tsp",
        "ginger:smallpice",
        "peper:1pinch",
        "water:1glass",
        "suger:1spoon",
      ],
      cuisine: "Indian",
      dishType: "drink",
      avatarUrl: "https://images.app.goo.gl/PXGfBzUjxGWWNbuf8",
      duration: 10,
      creator: "unknown",
    };
    return Recipe.create(newRecipe);
    // Run your code here, after you have insured that the connection was made
  })

  .then((dataFromDB) => {
    console.log(dataFromDB.title);
    Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
  })
  .then((update) => {
    console.log(`Update successful, new duration is`, update.duration);
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .then((result) => {
    if (result.deletedCount === 1) {
      console.log("Recipe successfully deleted");
    } else {
      console.log("Error deleting recipe");
    }
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
