const mongoose = require("mongoose");
const express = require("express");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const app = express();
const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany();
  })
  .then((x) => {
    // Run your code here, after you have insured that the connection was made
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Recipe.create({
//   title: "Asian Glazed Chicken Thighs 2",
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
// })
//   .then((res) => console.log(res.title))
//   .catch((err) => {
//     console.log(err);
//   });

// Recipe.insertMany(data)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

// Recipe.find()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

Recipe.deleteOne({ title: "Carrot Cake" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

// mongoose.connection.close((res)=>{
//   console.log('is it closed?',res)
// })

// mongoose.connection.close(function () {
//   console.log('Mongoose connection disconnected');
// });
// }

mongoose.disconnect((res) => {
  console.log("Mongoose connection disconnected");
});

app.listen(5005);
