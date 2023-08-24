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
  .then((recipeFromDB) => {
    console.log("you are creating a recipe 😊");

    const myFirstRecipe = {
      title: "Orzo With Mozarella and Smoked Mushrooms",
      level: "Easy Peasy",
      ingredients: [
        "champinions",
        "spice mixonion",
        "garlic",
        "cherry tomatoes",
        "tomato pesto",
        "grated hard cheese",
        "basil",
      ],
      cuisine: true,
      dishType: "main_course",
      duration: 40,
      creator: "HalloFResh",
    };

    return Recipe.create(myFirstRecipe);
  })
  .then(() => {
    console.log("you are insertimg a lot of data....");
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("you succesfully updated the Rigatoni alla GenoveseF");
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Carot Cake deleted");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
