const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

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
    // Iteration 2 - Create a recipe
    const newRecipe = {
      title: "Asian Glazed Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs",
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
    };
    console.log(newRecipe.title);
    return Recipe.create(newRecipe);
  })
  .then(() => {
    // Iteration 3 - Insert multiple recipes
    return Recipe.insertMany(data);
  })
  .then(() => {
    const filterTitle = { title: "Rigatoni alla Genovese" };
    const updateDuration = { duration: 100 };
    return Recipe.findOneAndUpdate(filterTitle, updateDuration);
  })
  .then(() => {
    // Iteration 5 - Remove a recipe
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    //Iteration 6 - Close the Database
    mongoose.connection.close(() => {
      console.log("Mongoose default connection closed");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
