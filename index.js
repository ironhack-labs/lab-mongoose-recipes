const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const recipes = {
  title: {
    type: String,
    unique: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [String],
  cuisine: {
    type: String,
    unique: true,
  },
  dishType: {
    type: String,
    enum: [
      "breakfast",
      "main_course",
      "soup",
      "snack",
      "drink",
      "dessert",
      "other",
    ],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: { type: Date, default: "today" },
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
    Recipe.create(recipes).then((createdRecipes) => {
      console.log(`Created ${createdRecipes.length} recipes!`);
    });
  })
  .then(() => {
    Recipe.insertMany(recipes, (error, docs));
  })
  .then(() => {
    Recipe.findOneAndUpdate(
      query,
      { $set: { duration: 100 } },
      options,
      callback
    );
  })
  .then(() => {
    Recipes.deleteOne({ title: "Carrot Cake" });
    console.log("Oh no!!!, we run out of Carrot Cakes");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// connection.end();
