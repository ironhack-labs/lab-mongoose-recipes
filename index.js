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

Recipe.create({
  title: "Pipi de chat",
  level: "Amateur Chef",
  ingredients: ["beef", "noodles", "soy", "nuoc mam"],
  cuisine: "Vietnamese",
  dishType: "Dish",
  image:
    "https://www.fodmapeveryday.com/wp-content/uploads/2017/06/Pho-closeup-copy.jpg",
  duration: 50,
  creator: "Cecile",
  created: 2000
})
  .then(res => {
    console.log(res.title);
  })
  .catch(err => {
    console.log("Error", err);
  });

Recipe.insertMany(data)
  .then(res => {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].title);
    }
  })
  .catch(err => {
    console.log("Error", err);
  });

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(res => {
    console.log("it works", res);
  })
  .catch(err => {
    console.log("Error", err);
  });

Recipe.findByIdAndRemove("5d0a4e0431aa66c7ab15af5c")
  .then(res => {
    console.log("Success !!! Recipe has been deleted", res);
  })
  .catch(err => {
    console.log("Error", err);
  });

mongoose.disconnect();
