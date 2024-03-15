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
    // Iteration 2

    const input = {
      title: "Fake Recipe",
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
      creator: "Chef Who",
    };

    Recipe.create(input, (error, recipe) => {
      if (error) {
        console.log("An error happened:", error);
        return;
      }
      console.log("The recipe is saved and its value is: ", recipe.title);
    });
    // Iteration 3
    Recipe.insertMany(data, (error, recipe) => {
      if (error) {
        console.log("An error happened:", error);
        return;
      }
      recipe.forEach((recipe) => console.log(`${recipe.title}`));
    });
    // Iteration 4
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then(() => {
        console.log("The recipe is updated for its duration");
      })
      .catch((error) => {
        console.error("Error updating recipe", error);
      });
    // Iteration 5
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => {
        console.log("The recipe is removed since it's no longer available");
      })
      .catch((error) => {
        console.error("Error removing recipe", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });



  