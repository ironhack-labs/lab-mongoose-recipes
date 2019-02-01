const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./models/recipe-model.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Recipe.create({
//   title: title,
//   level: level,
//   ingredient: ingredientList,
//   cuisine: cuisine,
//   dishType: dishType,
//   image: imgUrl,
//   duration: cookTime,
//   creator: chef
// })
//   .then()
//   .catch();

// Recipe.create({
//   title: "Asian NOT GLAZED (HAHAHA) Chicken Thighs",
//   level: "Amateur Chef",
//   ingredients: [
//     "1/2 cup rice vinegar",
//     "5 tablespoons honey",
//     "1/3 cup soy sauce (such as Silver Swan®)",
//     "1/4 cup Asian (toasted) sesame oil",
//     "3 tablespoons Asian chili garlic sauce",
//     "3 tablespoons minced garlic",
//     "salt to taste",
//     "8 skinless, boneless chicken thighs"
//   ],
//   cuisine: "Asian",
//   dishType: ["Dish"],
//   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//   duration: 40,
//   creator: "Chef LePapu"
// })
//   .then(result => {
//     console.log("CREATION SUCCESS", result);

//   })
//   .catch(err => {
//     console.log("CREATION FAILED", err);

//   });

// Recipe.insertMany(data)
//   .then(res => {
//     res.forEach(e => {
//       console.log(`Recipe name : ${e.title}`);
//     })
//   })
//   .catch(err => {
//     console.log("FAILED", err);

//   });

// Recipe.findByIdAndUpdate("5c544f9284b1fd583cbd7511", {$set: {duration: 999}})
//   .then(res => {
//     console.log("FIND & UPDATE SUCESS");
//   })
//   .catch(err => {
//   console.log("UPDATE FAILED");
// });

// Recipe.findByIdAndRemove("5c544f9284b1fd583cbd7513")
//   .then(res => {
//     console.log("DELETE SUCCESS");
//   })
//   .catch(err => {
//     console.log("DELETE FAILED BAKA");

//   });

// CLOSE DATABASE CONNECTION
// mongoose.connection.close(() => {
//   console.log("Mongoose connection disconnected");
// });
