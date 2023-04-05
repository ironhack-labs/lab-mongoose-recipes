const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .set("strictQuery", true)
  .connect(MONGODB_URI)
  .then((db) => {
    console.log(`Connected to the database: "${db.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe1 = {
      title: "Asian Glazed Chicken Thighs 1",
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
    return Recipe.create(recipe1);
  })
  .then((recipe1) => {
    console.log(recipe1.title);
    return Recipe.insertMany(data);
  })
  .then((data) => {
    data.forEach((eachRecipe) => {
      console.log(eachRecipe.title);
    });
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then((recipe) => {
    console.log(`Well done, ${recipe.title} has been updated 🫡`);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((recipe) => {
    console.log(`Congrats, ${recipe.title} has been deleted 👎`);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error(error);
  });
