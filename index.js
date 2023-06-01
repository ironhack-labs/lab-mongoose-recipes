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
    const newRecipe = {
      title: "Spanish Paella",
      level: "Easy Peasy",
      ingredients: [
        "onion",
        "saffron",
        "jumbo shrimp",
        "mussels",
        "calamari",
        "chicken thighs",
        "spanish rice",
      ],
      cuisine: "spanish",
      dishType: "main_course",
      duration: 60,
      creator: "Chef Aitor",
    };
    return Recipe.create(newRecipe);
  })
  .then((recipe) => {
    console.log(`Added new recipe: ${recipe.title}`);
  })

  .then(() => {
    return Recipe.insertMany(data);
  })

  .then((recipes) => {
    console.log(`Inserted ${recipes.length} recipes`);
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then(() => {
    console.log("The duration of Rigatoni alla Genovese is updated");
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("The Carrot Cake recipe has been removed.");

    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  })

  .finally(() => {
    mongoose.connection.close(() => {
      console.log("Database connection closed");
      process.exit(0);
    });
  });
