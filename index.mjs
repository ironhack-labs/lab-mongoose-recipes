import mongoose from "mongoose";
import Recipe from "./models/Recipe.model.js";
import data from "./data.json" assert { type: "json" };
// const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
// const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
// const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

await mongoose.connect(MONGODB_URI);
await mongoose.connection.db.dropDatabase();
await mongoose.connection.close();

await mongoose.connect(MONGODB_URI);

// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI)
//   .then((x) => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany();
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database", error);
//   });

// const paella = new Recipe({
//   title: "Asian Glazed Chicken Thighs",
//   level: "Amateur Chef",
//   ingredients: [
//     "1/2 cup rice vinegar",
//     "5 tablespoons honey",
//     "1/3 cup soy sauce (such as Silver Swan®)",
//     "1/4 cup Asian (toasted) sesame oil",
//     "3 tablespoons Asian chili garlic sauce",
//     "3 tablespoons minced garlic",
//     "salt to taste",
//     "8 skinless, boneless chicken thighs",
//   ],
//   cuisine: "Asian",
//   dishType: "main_course",
//   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//   duration: 40,
//   creator: "Chef LePapu",
// });

// await paella.save();
// console.log(paella.title);

await Recipe.insertMany(data);

await data.forEach((data) => {
  console.log(data.title);
});

await Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 }
).then(() => console.log("Duration uptated with success!"));

const carrotCake = await Recipe.findOne({ title: "Carrot Cake" });
// console.log(carrotCake);
await Recipe.deleteOne(carrotCake).then(() =>
  console.log(`${carrotCake.title} recipe deleted with success!`)
);

await mongoose.connection.close();
