const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");
const RecipeModel = require("./models/Recipe.model");
const { deleteOne } = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);

    // Iteration 3
    return RecipeModel.insertMany(data);
  })
  .then((dataAdded) => {
    dataAdded.forEach((dataAdded) => {
      console.log(`${dataAdded.title}`);
    });
  });

// Iteration 2

RecipeModel.create({
  title: "Butter Chicken",
  level: "UltraPro Chef",
  cuisine: "Indian",
  ingredienets: ["chicken", "butter"],
  image: "",
  duration: 60,
  creator: "Chef Unknown",
}).then((createdReceipe) => {
  console.log("createdReceipe:", createdReceipe.title);
});

// Iteration 4 to update the duration

RecipeModel.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 },

  {
    new: true,
  }
).then((updated) => {
  console.log("updated duration:", updated.duration);
});

// Iteration 5 to deleted the title carrot cake

RecipeModel.deleteOne({
  title: "Carrot Cake",
})
  .then((success) => {
    console.log("title updated:", success.title);
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
