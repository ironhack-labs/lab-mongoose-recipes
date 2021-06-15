const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //   return Recipe.create({
    //     title: "Lemon Popsicles",
    //     level: "Easy Peasy",
    //     ingredients: ["water", "lemon juice", "sugar", "lemon zest"],
    //     cuisine: "English",
    //     dishType: "dessert",
    //     image: "https://www.courtneyssweets.com/lemonade-popsicles/",
    //     duration: 20,
    //     creator: "Luci",
    //   });
    // })
    // .then((recipe) => {
    //   console.log(`"${recipe.title}" has been added to database`);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) =>
      console.log(`Recipe with the title ${recipe.title} has been created`)
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
