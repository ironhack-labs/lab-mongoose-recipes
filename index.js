const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

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
      title: "Senem and Andre recipe",
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
    const recipesArr = require("./data.json");
    Recipe.insertMany(recipesArr);
    recipesArr.forEach((recipe) => {
      console.log(recipe.title);
    });
    return Recipe.findOneAndUpdate(
      "6413590efe79f46683f1cedf",
      // {title: "Rigatoni alla Genovese"},

      {
        duration: 100,
      },
      { new: true }
    );
  })
  .then(() => {
    return console.log(
      "you have sucessfully updated the duration of the recipe"
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    return console.log("you have sucessfully deleted this recipe");
  })
  .then(() => {
    mongoose.disconnect();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
