const mongoose = require("mongoose");
const fs = require("fs");

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
    /* let Recipe1 = {
      title: "Ratatouille",
      level: "Easy Peasy",
      ingredients: ["tomato", "zucchini", "aubergine"],
      cuisine: "French",
      dishType: "main_course",
      image:
        "https://images.aws.nestle.recipes/original/f60f99ee856ae5667d84479582d4dbc5_ratatuuuuu.jpg",
      duration: 10,
      creator: "Chloé",
      created: "2022-04-30",
    };

    Recipe.create(Recipe1); */

    //use this: https://medium.com/@micahbales/how-to-batch-insert-json-data-into-mongodb-using-mongoose-6e4b8759833e
    const recipes = JSON.parse(
      fs.readFileSync(__dirname + "/data.json", "utf-8")
    );
    Recipe.insertMany(recipes);
  })
  .then(() => console.log("done"))
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 },
  { new: true }
)
  .then((recipe) => console.log(recipe.duration))
  .then(() => console.log("success"))
  .catch((err) => console.log(err));

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => console.log("Carrot Cake has been removed"))
  .catch((err) => console.log(err));
