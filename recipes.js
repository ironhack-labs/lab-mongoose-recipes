const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./Models/Recipie.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.update({ title: "Rigatoni alla Genovese" }, { duration: 100 });
  })
  .then(result => {
    console.log("Great success!");
  })
  .then(() => {
    return Recipe.remove(
      {
        title: "Carrot Cake"
      },
      function(err) {}
    );
  })
  .then(() => {
    mongoose.connection.close();
    console.log("Connection to Mongo closed!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//Iteration 1:
// const newRecipie = new Recipe({
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
//     "8 skinless, boneless chicken thighs"
//   ],
//   cousine: "Asian",
//   dishType: ["Dish"],
//   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//   duration: 40,
//   creator: "Chef LePapu"
// });
// newRecipie.save();
