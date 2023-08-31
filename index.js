const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

const penneCaprese = {
  title: "Penne Parm",
  level: "Easy Peasy",
  ingredients: [
    "penna pasta",
    "tomato sauce",
    "fresh mozz",
    "fresh tomatoes",
    "grilled chicken",
    "fresh basil",
  ],
  cuisine: "Italian",
  dishType: "main_course",
  image: "",
  duration: 20,
  creator: "Erik Torres",
  created: Date("2020-01-21"),
};

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
    Recipe.create(penneCaprese).then((food) =>
      console.log(`${food.title} was added to DB!`)
    );
    // Recipe.create(penneCaprese)
    //   .then((recipe) => console.log(`Recipe ${recipe.title} is added to DB!`))
    //   .catch((err) => console.log(`An error occured while adding the recipe`));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
