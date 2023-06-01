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
    return Recipe.deleteMany();
  })
  .then(() => {
    const recipeOne = {
      title: "Apple Strudel",
      level: "Amateur Chef",
      ingredients: [
        "1/3 cup golden raisins,",
        "2 Tbsp rum",
        "4 medium apples",
        "1 tbsp lemon juice",
        "1 tsp ground cinnamon",
        "1/2 cup granulated sugar",
        "1/4 cup slivered almonds",
        "1 tsp vanilla extract",
      ],
      cuisine: "German",
      dishType: "dessert",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 60,
      creator: "Maria SoftCake Friedeman",
    };
    return Recipe.create(recipeOne);
  })
  .then((recipe) => {
    console.log(recipe.title);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
