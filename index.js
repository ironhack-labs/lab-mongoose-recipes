const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const recipe1 = {
  title: "Orange and Milk-Braised Pork Carnitas",
  level: "UltraPro Chef",
  ingredients: [
    "3 1/2 pounds boneless pork shoulder, cut into large pieces",
    "1 tablespoon freshly ground black pepper",
    "1 tablespoon kosher salt, or more to taste",
    "2 tablespoons vegetable oil",
    "2 bay leaves",
    "2 teaspoons ground cumin",
    "1 teaspoon dried oregano",
    "1/4 teaspoon cayenne pepper",
    "1 orange, juiced and zested"
  ],
  cuisine: "American",
  dishType: "Dish",
  image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
  duration: 160,
  creator: "Chef John"
};

// Recipe.create(recipe1)
//   .then(document => {
//     console.log(document);
//   })
//   .catch(err => {
//     console.log("ERROR: ", err);
//   });


  // Recipe.insertMany(data)

  Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err)
  });


  Recipe.deleteOne({title: "Carrot Cake"}, function (err) { console.log(err)});